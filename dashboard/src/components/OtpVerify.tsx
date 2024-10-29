import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useRef, useState } from "react";
import { Button } from "./ui/button";
import { verifyOTPAndCreateUser } from "@/actions/auth";
import { signIn } from "next-auth/react";

export function OTPVerifyModal({
  defaultState,
  email,
  name,
  password,
}: {
  defaultState: boolean;
  email: string;
  name: string;
  password: string;
}) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(defaultState);
  const otpRef = useRef<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const otpVerifyHandler = async () => {
    if (!otpRef.current) return;
    setLoading(true);
    const result = await verifyOTPAndCreateUser(
      email,
      name,
      password,
      otpRef.current
    );

    if (!result) {
      setError("Invalid OTP");
      return;
    }

    await signIn("credentials", {
      callbackUrl: "/dashboard",
      email,
      password,
    });

    setLoading(false);
  };
  return (
    <Dialog
      open={isModalOpen}
      onOpenChange={() => setIsModalOpen((prev) => !prev)}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>OTP Verify</DialogTitle>
          <DialogDescription className="mx-auto">
            <InputOTP
              maxLength={6}
              onChange={(value) => {
                otpRef.current = parseInt(value);
              }}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mx-auto">
          <Button disabled={loading} onClick={otpVerifyHandler}>
            Verify OTP
          </Button>
          {error && <div className="text-red-500">{error}</div>}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
