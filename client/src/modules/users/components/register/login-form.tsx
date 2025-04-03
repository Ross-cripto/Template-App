import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/core/components/ui/card"
import GoogleAuth from "./google-auth";
import loginSvg from '@/assets/svg/login-svg.svg'

export function LoginForm() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Type is already correct

  return (
    <div className="grid lg:grid-cols-2 min-h-screen">
      {/* Login Section */}
      <div className="flex items-center justify-center p-8">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-4">
            <CardTitle className="text-3xl font-bold tracking-tight">Bienvenido</CardTitle>
            <CardDescription className="text-lg">
              Por favor, loguearse con su cuenta de Google
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form>
              <div className="space-y-4">
                {errorMessage && (
                  <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                    {errorMessage}
                  </div>
                )}
                <div className="pt-4">
                  <GoogleAuth setError={setErrorMessage} />
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      <div 
        className="hidden lg:block bg-cover bg-center pl-6"
      > 
        <img src={loginSvg} alt="" className="w-full h-full p-32" />
        <div className=" bg-black/20 backdrop-blur-[2px]" />
      </div>
    </div>
  );
}