import Link from "next/link";

function Login() {
  const googleLogin = () => {
    <Link href={"/api/user/login/google"}></Link>;
  };
  return (
    <div
      className={`box-border flex items-center justify-center bg-opacity-80 rounded-full min-h-[45px] max-h-[80px] min-w-[288px] h-[6.9vh] max-w-[480px] w-[15vw] font-hopang-black text-3xl border-[4px] shadow-xl duration-[0.66s] hover:scale-105 mt-[1vh] cursor-pointer py-2 bg-gradient-to-br from-gray-200 to-gray-50 hover:from-gray-50 hover:to-gray-200`}
      onClick={googleLogin}
    >
      구글 로그인
    </div>
  );
}

export default Login;
