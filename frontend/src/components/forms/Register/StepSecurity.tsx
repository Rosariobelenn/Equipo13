export default function StepSecurity() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Credenciales de Seguridad</h2>

      <input
        type="text"
        placeholder="Usuario"
        className="border p-2 w-full rounded"
      />
      <input
        type="password"
        placeholder="Contraseña"
        className="border p-2 w-full rounded"
      />
      <input
        type="password"
        placeholder="Confirmar contraseña"
        className="border p-2 w-full rounded"
      />
    </div>
  );
}
