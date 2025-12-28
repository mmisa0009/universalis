export default function InputField({ label, type = "text", placeholder, id }) {
  return (
    <div>
      <p className="text-white mb-1">{label}</p>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        className="w-full rounded-lg p-2 bg-white bg-opacity-50 placeholder-black/30"
      />
    </div>
  );
}