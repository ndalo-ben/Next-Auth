import { sendMail } from "@/lib/mail";

export default async function Home() {

  await sendMail({
    to: "techwolf54@gmail.com",
    subject: "Test",
    body: "Test"
  });
  return (
    <div>
      <p>Home Page</p>
    </div>
  );
}
