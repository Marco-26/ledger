import { isAxiosError } from "axios";
import { Constants } from "@/utils/constants";
import Toast from "react-native-toast-message";

type ErrorCode = keyof typeof Constants.ERRORS;

export const showToastOnError = (error: Error | null) => {
  if (!error) return;

  const code = isAxiosError<{ code?: string }>(error)
    ? error.response?.data?.code
    : undefined;

  const errorCode = Constants.ERRORS[code as ErrorCode];

  Toast.show({
    type: "error",
    text1: errorCode.text1 ?? Constants.ERRORS.GENERAL.text1,
    text2: errorCode.text2 ?? Constants.ERRORS.GENERAL.text2,
  });
}