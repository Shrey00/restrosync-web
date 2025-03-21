'use client'
import { useState,  useRef, KeyboardEvent } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
export default function SignUpForm() {
  const [step, setStep] = useState(1)

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    contact: '',
    email: '',
    password: ''
  })

  const countryCode = {
    "name": "India",
    "phone":"+91",
    "emoji": "\ud83c\uddee\ud83c\uddf3",
    "image": "https:\/\/cdn.jsdelivr.net\/npm\/country-flag-emoji-json@2.0.0\/dist\/images\/IN.svg"
  };
  const [formWarning, setFormWarning] = useState('');
  const [showVerifyBtn, setShowVerifyBtn] = useState(true);
  const [otp, setOtp] = useState(['', '', '', '']);
  const otpRefs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)]
  const emailRef = useRef<HTMLInputElement>(null)


  const handleOtpChange = (index: number, value: string) => {
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Move to next input if current one is filled
    if (value && index < 3) {
      otpRefs[index + 1].current?.focus()
    }
  }

  const handleOtpKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs[index - 1].current?.focus()
    }
  }

  const handleVerifyOtp = () => {
    const otpValue = otp.join('')
    console.log('Verifying OTP:', otpValue)
    // Here you would typically send the OTP to your backend for verification
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value;

    if(e.target.id === "phone"){
      inputValue = inputValue.replaceAll(/\D/g, "");
      if(inputValue.length>10){
        setShowVerifyBtn(false);
        setFormWarning("Digits should not be more than 10")
      }
      else if(inputValue.length <= 10){
        setShowVerifyBtn(true);
        setFormWarning("")
      }
    }
    setFormData({ ...formData, [e.target.name]: inputValue });
  }
  console.log(formData)

  const handleNext = () => {
    console.log(step, formData.firstName.length, formData.lastName.length)
    if(step === 1 && (formData.firstName.length===0 || formData.lastName.length === 0)) {
      setFormWarning("Please enter your first name and last name!");
    }else if(step === 1 && (formData.firstName.length>0 || formData.lastName.length>0)){
      setFormWarning("");
      setStep((step + 1))
    }else if(step === 2 && (formData.email.length===0 || formData.password.length === 0)) {
      setFormWarning("Please enter your email and password!");
    }else if(step === 2 && (formData.email.length>0 && formData.password.length > 0 && !emailRef.current?.checkValidity())) {
      emailRef.current?.reportValidity();
      if(formData.password.length<8) {
        setFormWarning("Password should have at least 8 characters!");
      }
    }else if(formData.password.length<8) {
      setFormWarning("Password should have at least 8 characters!");
    }else if(step === 2 && (formData.email.length>0 && formData.password.length >= 8 && emailRef.current?.checkValidity())) {
      setStep(step+1);
      setFormWarning("");
    }
  }

  const handlePrevious = () => {
    setStep(step - 1)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
         <Card className="w-[350px]">
         <CardHeader>
           <CardTitle className="text-3xl mb-3 font-bold text-center text-primary">Restrosync</CardTitle>
         </CardHeader>
         <CardContent>
           <form onSubmit={handleSubmit}>
             {step === 1 && (
               <div className="space-y-4">
                 <div className="space-y-2">
                   <Label className="font-semibold" htmlFor="firstName">First Name</Label>
                   <Input
                     id="firstName" 
                     name="firstName" 
                     value={formData.firstName} 
                     onChange={handleChange} 
                     required 
                   />
                 </div>
                 <div className="space-y-2">
                   <Label className="font-semibold" htmlFor="lastName">Last Name</Label>
                   <Input 
                     id="lastName" 
                     name="lastName" 
                     value={formData.lastName} 
                     onChange={handleChange} 
                     required 
                   />
                 </div>
               </div>
             )}
             {step === 2 && (
               <div className="space-y-4">
                 <div className="space-y-2">
                   <Label className="font-semibold" htmlFor="email">Email</Label>
                   <Input 
                     id="email"
                     name="email" 
                     type="email"
                     ref = {emailRef}
                     value={formData.email} 
                     onChange={handleChange} 
                     required
                   />
                 </div>
                 <div className="space-y-2">
                   <Label className="font-semibold" htmlFor="password">Password</Label>
                   <Input 
                     id="password" 
                     name="password" 
                     type="password" 
                     value={formData.password} 
                     onChange={handleChange} 
                     required 
                   />
                 </div>
               </div>
             )}
             {step === 3 && (
              <div>
              <div className="space-y-2">
              <Label className="font-semibold" htmlFor="phone">Phone Number</Label>
              <div className="flex">
                <div className="flex gap-1 flex-nowrap items-center">
                  <img className="mt-[2px]" width={24} height={24} src={countryCode.image}/>
                  <p className="font-semibold">+91</p>
                </div>  
                <Input
                  id="phone"
                  type="tel"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  className="flex-1 ml-2"
                  placeholder="Enter phone number"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="font-semibold" htmlFor="otp-0">OTP</Label>
              <div className="flex space-x-2">
                {otp.map((digit, index) => (
                  <Input
                    key={index}
                    id={`otp-${index}`}
                    ref={otpRefs[index]}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    className="w-12 text-center"
                    aria-label={`OTP digit ${index + 1}`}
                  />
                ))}
              </div>
            </div>
            </div>
             )}
           </form>
         </CardContent>
         <CardFooter className="flex justify-between gap-4">
           {step > 1 && (
             <Button onClick={handlePrevious} variant="outline" className="rounded-full p-0 h-[38px] w-[38px] flex-shrink-0">
               <ChevronLeftIcon height={24} width={24}/>
             </Button>
           )}
           {
            formWarning.length ?<p className='text-red-600 text-sm font-semibold'>{formWarning}</p>: ''
           }
           {step < 3 ? (
             <Button onClick={handleNext} className="ml-auto flex-shrink-0 rounded-full p-0 h-[38px] w-[38px]">
               <ChevronRightIcon height={24} width={24}/>
             </Button>
           ) : showVerifyBtn && (
            <Button onClick={handleVerifyOtp} className="w-full">Verify OTP</Button>
           )}
         </CardFooter>
       </Card>
    </div>
  )
}