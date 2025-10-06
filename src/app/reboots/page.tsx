import LoginForm from "@/components/admin/LoginForm";
// import SignupForm from "@/components/admin/SignupForm"

const page = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-defined-purple/10">
      <LoginForm />
      {/* <SignupForm /> */}
    </div>
  );
};

export default page;
