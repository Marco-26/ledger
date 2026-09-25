import { TouchableOpacity, View } from "react-native";
import { Octicons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import { useTheme, useThemedStyles } from "@/styles/theme";
import { createStyles } from "./FloatingButton.styles";

interface UploadFileFloatingButtonProps {
  onFileSelected?: (file: DocumentPicker.DocumentPickerAsset) => void;
  accessibilityLabel?: string;
}

export default function UploadFileFloatingButton({
  onFileSelected,
  accessibilityLabel = "Import a statement",
}: UploadFileFloatingButtonProps) {
  const styles = useThemedStyles(createStyles);
  const { colors } = useTheme();

  const openFilePicker = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
        multiple: false,
        copyToCacheDirectory: true,
      });

      // Cancelling is a normal outcome here, not a failure.
      if (result.canceled) return;

      const [file] = result.assets;
      if (file) onFileSelected?.(file);
    } catch (error) {
      console.warn("Could not open the file picker:", error);
    }
  };

  return (
    // box-none lets taps fall through to the content behind the overlay.
    <View style={styles.overlay} pointerEvents="box-none">
      <TouchableOpacity
        style={styles.button}
        onPress={openFilePicker}
        activeOpacity={0.85}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
      >
        <Octicons name="diff-added" size={24} color={colors.textInverse} />
      </TouchableOpacity>
    </View>
  );
}
