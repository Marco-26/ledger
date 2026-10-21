import { ActivityIndicator, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme, useThemedStyles } from "@/styles/theme";
import { pickStatementFile } from "@/utils/statementPicker";
import { createStyles } from "./UploadFileFloatingButton.styles";

interface UploadFileFloatingButtonProps {
  onFileSelected?: (file: File) => void;
  accessibilityLabel?: string;
	isLoading?: boolean;
	disabled?: boolean;
}

export default function UploadFileFloatingButton({
  onFileSelected,
  accessibilityLabel = "Import a statement",
	isLoading = false,
  disabled
}: UploadFileFloatingButtonProps) {
  const styles = useThemedStyles(createStyles);
  const { colors } = useTheme();

	const openFilePicker = async () => {
		if (disabled) return;
    const file = await pickStatementFile();
    if (file) onFileSelected?.(file);
  };

  return (
    // box-none lets taps fall through to the content behind the overlay.
    <View style={styles.overlay} pointerEvents="box-none" >
      <TouchableOpacity
        style={styles.button}
        onPress={openFilePicker}
        disabled={isLoading}
        activeOpacity={0.85}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
        accessibilityState={{ disabled: isLoading, busy: isLoading }}
      >
        {isLoading ? (
          <ActivityIndicator color={colors.textInverse} />
        ) : (
          <Ionicons name="document-attach-outline" size={24} color={colors.textInverse} />
        )}
      </TouchableOpacity>
    </View>
  );
}
