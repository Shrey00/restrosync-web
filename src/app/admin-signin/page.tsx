"use client";
import { useState, useRef, useContext } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EyeOpenIcon, EyeClosedIcon } from "@radix-ui/react-icons";
import { UserContext } from "@/context/context";
export default function SignIpForm() {
  const [step] = useState(1);
  const [passwordShow, setPasswordShow] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // const countryCode = {
  //   name: "India",
  //   phone: "+91",
  //   emoji: "\ud83c\uddee\ud83c\uddf3",
  //   image:
  //     "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/IN.svg",
  // };
  const [formWarning, setFormWarning] = useState("");
  const emailRef = useRef<HTMLInputElement>(null);
  const { setUser } = useContext(UserContext);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setFormData({ ...formData, [e.target.name]: inputValue });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.email.length === 0 || formData.password.length === 0) {
      setFormWarning("Please enter your email and password!");
    } else if (
      formData.email.length > 0 &&
      formData.password.length > 0 &&
      !emailRef.current?.checkValidity()
    ) {
      emailRef.current?.reportValidity();
      if (formData.password.length < 0) {
        setFormWarning("Password should have at least 8 characters!");
      }
    } else if (formData.password.length < 0) {
      setFormWarning("Password should have at least 8 characters!");
    } else if (
      formData.email.length > 0 &&
      formData.password.length >= 0 &&
      emailRef.current?.checkValidity()
    ) {
      setFormWarning("");
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/signin`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(formData).toString(),
      });
      const parsedResponse = await response.json();
      const token = parsedResponse.data[0].token;
      localStorage.setItem('token', token);
      setUser({
        firstName: parsedResponse.data[0].firstName,
        lastName: parsedResponse.data[0].lastName,
        email: parsedResponse.data[0].email,
        role: parsedResponse.data[0].role,
        contact: parsedResponse.data[0].contact,
        token: token,
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-3xl mb-3 font-bold text-center text-primary">
            Restrosync
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="font-semibold" htmlFor="email">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    ref={emailRef}
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="relative space-y-2">
                  <Label className="font-semibold" htmlFor="password">
                    Password
                  </Label>
                  <Input
                    id="password"
                    name="password"
                    type={passwordShow ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    className="pr-9"
                    required
                  />
                  {passwordShow ? (
                    <EyeClosedIcon
                      className="cursor-pointer absolute right-3 top-[50%]"
                      onClick={() => setPasswordShow(false)}
                    />
                  ) : (
                    <EyeOpenIcon
                      className="cursor-pointer absolute right-3 top-[50%]"
                      onClick={() => setPasswordShow(true)}
                    />
                  )}
                </div>
              </div>
            )}
          </form>
        </CardContent>
        <CardFooter className="flex flex-col justify-between gap-4">
          {formWarning.length ? (
            <p className="text-red-600 text-sm font-semibold">{formWarning}</p>
          ) : (
            ""
          )}
          {/* {step < 3 ? (
             <Button onClick={handleNext} className="ml-auto flex-shrink-0 rounded-full p-0 h-[38px] w-[38px]">
               <ChevronRightIcon height={24} width={24}/>
             </Button>
           ) : showVerifyBtn && (
            <Button onClick={handleVerifyOtp} className="w-full">Verify OTP</Button>
           )} */}
          <Button onClick={handleSubmit} className="w-full">
            Sign In
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
