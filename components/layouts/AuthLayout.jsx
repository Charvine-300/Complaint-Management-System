export default function AuthLayout({ children }) {
    return (
      <div className="flex flex-col gap-8 items-center justify-center h-screen w-full bg-white lg:bg-cover lg:bg-center lg:bg-[url('/assets/images/onboarding-bg-p-800.png')]">
        
        {/* Modal Container */}
        <img src="/assets/icons/Logo.svg" alt="black logo" className="hidden lg:block lg:mx-auto" />
        <div className="w-full max-w-[500px] bg-white p-6 lg:rounded-lg lg:border lg:border-gray-300">
          {children}
        </div>
  
      </div>
    );
  }
  