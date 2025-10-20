import { useState } from "react";
import StepCompany from "./StepCompany";
import StepRepresentative from "./StepRepresentative";
import StepSecurity from "./StepSecurity";
import StepDocuments from "./StepDocuments";
import Footer from "../../layout/Footer/Footer";

interface RegisterData {
  user: {
    gmail: string;
    password: string;
  };
  company: {
    business_name: string;
    tax_id: string;
    company_type: string;
  };
  legal_representative: {
    full_name: string;
    position: string;
    document_type: string;
    document_number: string;
    corporate_email: string;
    contact_phone: string;
  };
}

export default function RegisterFlow() {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState<RegisterData>({
    user: {
      gmail: "",
      password: "",
    },
    company: {
      business_name: "",
      tax_id: "",
      company_type: "",
    },
    legal_representative: {
      full_name: "",
      position: "",
      document_type: "",
      document_number: "",
      corporate_email: "",
      contact_phone: "",
    },
  });

  const nextStep = () => setStep((s) => Math.min(s + 1, 4));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const progress = ((step - 1) / 3) * 100;

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        "https://pymego.onrender.com/v1/api/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) throw new Error("Error en el registro");

      alert("Registro completado ✅");
      console.log(formData);
    } catch (error) {
      alert("Hubo un error al registrar ❌");
      console.error(error);
      console.log(formData);
    }
  };

  return (
    <div className='min-h-screen flex flex-col bg-gray-50'>
      <div className='flex-grow flex flex-col items-center justify-center w-full'>
        <div className='bg-white shadow-lg rounded-lg p-8 w-full max-w-lg'>
          {/* Steps */}
          <div className='flex justify-between mb-4'>
            {[
              "Datos empresa",
              "Representante",
              "Seguridad",
              "Documentación",
            ].map((label, index) => (
              <div
                key={index}
                className={`flex flex-col items-center text-sm ${
                  step === index + 1
                    ? "text-primary font-semibold"
                    : "text-gray-400"
                }`}
              >
                <div
                  className={`w-8 h-8 flex items-center justify-center rounded-full border-2 ${
                    step >= index + 1
                      ? "bg-primary text-white"
                      : "border-gray-300"
                  }`}
                >
                  {index + 1}
                </div>
                <span className='mt-2'>{label}</span>
              </div>
            ))}
          </div>

          {/* Progress bar */}
          <div className='relative w-full h-2 bg-gray-200 rounded-full mb-6'>
            <div
              className='absolute left-0 top-0 h-2 bg-primary rounded-full transition-all duration-500'
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          {/* Form Steps */}
          {step === 1 && (
            <StepCompany
              data={formData.company}
              onChange={(company) =>
                setFormData((prev) => ({ ...prev, company }))
              }
            />
          )}
          {step === 2 && (
            <StepRepresentative
              data={formData.legal_representative}
              onChange={(legal_representative) =>
                setFormData((prev) => ({ ...prev, legal_representative }))
              }
            />
          )}
          {step === 3 && (
            <StepSecurity
              data={formData.user}
              onChange={(user) => setFormData((prev) => ({ ...prev, user }))}
            />
          )}
          {step === 4 && <StepDocuments />}

          {/* Buttons */}
          <div className='flex justify-between mt-6'>
            {step > 1 ? (
              <button
                onClick={prevStep}
                className='px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-100'
              >
                ← Anterior
              </button>
            ) : (
              <div />
            )}

            {step < 4 ? (
              <button
                onClick={nextStep}
                className='px-4 py-2 bg-secondary text-white rounded-md hover:bg-primary'
              >
                Siguiente →
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className='px-4 py-2 bg-secondary text-white rounded-md hover:bg-primary'
              >
                Completar registro
              </button>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
