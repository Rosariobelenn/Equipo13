import { useState } from "react";
import { Clock } from "lucide-react";
import SectionHeader from "../components/ui/SectionHeader";
import { applications, requestSteps } from "../data/applications";
import { useParams } from "react-router-dom";
import { formatAmount } from "../lib/utils/utils";
import type { RequestDetailsTabs } from "../types/request.types";
import CurrentStatusBanner from "../components/ui/CurrentStatusBanner";
import TabsNavigation from "../components/ui/TabsNavigation";
import TabsContent from "../components/ui/TabsContent";
import { REQUEST_DETAILS_TABS } from "../constants/requestDetailsTabs";

function RequestDetails() {
  const [activeTab, setActiveTab] = useState<RequestDetailsTabs>("progress");
  const { id } = useParams();
  const application = applications.find((application) => application.id === id);

  return (
    <section className="bg-gray-50 p-6" id="request-details">
      {application && (
        <article className="max-w-5xl mx-auto">
          <SectionHeader
            backLink={{
              path: "/requests-list",
              text: "Volver a mis solicitudes",
            }}
            title={`Solicitud ${application.id}`}
            subtitle={`Monto: ${formatAmount(application.amount)}`}
            badge={{
              text: "En revisión",
              variant: "yellow",
            }}
          />

          <CurrentStatusBanner
            title="Estado actual"
            icon={<Clock className="text-blue-600" size={24} />}
            description="Tu solicitud está siendo revisada por nuestro equipo. Te notificaremos cualquier novedad."
          />

          <div className="overflow-hidden">
            <TabsNavigation
              activeTab={activeTab}
              onTabChange={setActiveTab}
              tabs={REQUEST_DETAILS_TABS}
            />

            <div className="rounded-xl bg-white border border-gray-200 p-4 md:p-6">
              {activeTab === "progress" && (
                <TabsContent
                  title="Progreso de tu solicitud"
                  requestDetails={requestSteps}
                />
              )}

              {activeTab === "documents" && (
                <TabsContent
                  title="Documentos"
                  description="Aquí aparecerán los documentos relacionados con tu solicitud."
                />
              )}

              {activeTab === "contact" && (
                <TabsContent
                  title="Contacto"
                  description="Información de contacto y soporte."
                />
              )}
            </div>
          </div>
        </article>
      )}
    </section>
  );
}

export default RequestDetails;
