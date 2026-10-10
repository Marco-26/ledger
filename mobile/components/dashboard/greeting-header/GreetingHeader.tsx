import { useRef, useState } from "react";
import { Pressable, Text, View, useWindowDimensions } from "react-native";
import { Image } from "expo-image";
import * as Haptics from "expo-haptics";
import type { IUser } from "@/hooks/useCurrentUser";
import { useThemedStyles } from "@/styles/theme";
import { HIT_SLOP, Spacing } from "@/styles/tokens";
import { getGreeting, getInitials } from "@/utils/format";
import ProfileMenuModal, { type MenuAnchor } from "../profile-menu-modal/ProfileMenuModal";
import { createStyles } from "./GreetingHeader.styles";

interface GreetingHeaderProps {
	user: IUser;
}

export default function GreetingHeader({ user }: GreetingHeaderProps) {
  const styles = useThemedStyles(createStyles);
	const greeting = getGreeting();
	const { width: windowWidth } = useWindowDimensions();
	const avatarRef = useRef<View>(null);
	const [menuAnchor, setMenuAnchor] = useState<MenuAnchor | null>(null);
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const openMenu = () => {
		// Measure at open time so the menu hangs from wherever the avatar is now.
		avatarRef.current?.measureInWindow((x, y, width, height) => {
			setMenuAnchor({ top: y + height + Spacing[2], right: windowWidth - (x + width) });
			setIsMenuOpen(true);
			Haptics.selectionAsync();
		});
	};

  return (
    <View style={styles.container}>
      <View style={styles.text}>
        <Text style={styles.salutation}>{greeting},</Text>
        <Text style={styles.name} numberOfLines={1}>
          {user.name}
        </Text>
      </View>

      <Pressable
        ref={avatarRef}
        onPress={openMenu}
        hitSlop={HIT_SLOP}
        style={({ pressed }) => [
          styles.monogram,
          isMenuOpen && styles.monogramActive,
          pressed && styles.monogramPressed,
        ]}
        accessibilityRole="button"
        accessibilityLabel="Account menu"
        accessibilityState={{ expanded: isMenuOpen }}
      >
        {user.profileImageUrl ? (
          <Image source={{ uri: user.profileImageUrl }} style={styles.avatar} />
        ) : (
          <Text style={styles.initials}>{getInitials(user.name)}</Text>
        )}
      </Pressable>

      <ProfileMenuModal
        visible={isMenuOpen}
        anchor={menuAnchor}
        user={user}
        onClose={() => setIsMenuOpen(false)}
      />
    </View>
  );
}
