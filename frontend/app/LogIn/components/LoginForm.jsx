import InputField from './InputField';
export default function LoginForm() {
  return (
    <form className="flex flex-col gap-4">
      <InputField label="Email" type="email" placeholder="Enter your email" id="email" />
      <InputField label="Password" type="password" placeholder="Enter your password" id="password" />
      <button className="mt-4 bg-[#001C3D] text-[#FFF8F0] rounded-lg py-2 text-sm hover:text-[#001C3D] hover:bg-[#FFF8F0]">Log In</button>
    </form>
  );
}