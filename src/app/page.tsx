import Image from "next/image";
import { ButtonLogin } from "./_components/buttonLogin";
export default async function Login() {
  return (
    <main className="flex items-center">
      <div className="flex w-[911px] items-center justify-center">
        <Image
          src="/Logo.webp"
          width={911}
          height={1026}
          alt="Logo"
          className="flex h-screen"
        />
      </div>
      <section className="flex max-h-full w-[720px] max-w-full flex-col items-center justify-center">
        <ButtonLogin />
      </section>
    </main>
  );
}
