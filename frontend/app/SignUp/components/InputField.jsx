export default function InputField({ label, type = 'text', placeholder = '', id, value, onChange, disabled }) {
  return (
    <div>
      <label htmlFor={id} className="text-white mb-1 block text-sm">{label}</label>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="w-full rounded-lg p-2 bg-white/80 text-black placeholder-black/30 focus:outline-none focus:ring-2 focus:ring-white/60 disabled:opacity-60"
      />
    </div>
  );
}
