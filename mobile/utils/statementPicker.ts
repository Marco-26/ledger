import * as DocumentPicker from "expo-document-picker";

export async function pickStatementFile(): Promise<File | undefined> {
  try {
    const result = await DocumentPicker.getDocumentAsync({
      type: "application/pdf",
      multiple: false,
      copyToCacheDirectory: true,
    });

    if (result.canceled) return undefined;

    return result.assets[0] as unknown as File | undefined;
  } catch (error) {
    console.warn("Could not open the file picker:", error);
    return undefined;
  }
}
