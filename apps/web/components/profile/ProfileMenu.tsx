import { Menu, Avatar } from '@mantine/core';
import {
    IconSettings,
    IconTrash,
    IconLogout2
} from '@tabler/icons-react';
import { signOut, useSession } from '../../lib/auth-client';
import { primaryColors, secondaryColors } from '../../utils/colors';

export default function ProfileMenu() {
    const session = useSession()
    return (
        session.data &&
        <Menu shadow="md" width={200} styles={{
            dropdown: {
                backgroundColor: secondaryColors.DARK,
                color: primaryColors.DEFAULT,
                border: `3px solid ${secondaryColors.LIGHT}`,
            },
            item: {
                color: primaryColors.DEFAULT,
            },
        }}>
            <Menu.Target>
                {session.data.user.image ?
                    <Avatar src={session.data.user.image || ""} alt={session.data.user.name} />
                    : <Avatar color="teal" radius="xl" />
                }
            </Menu.Target>

            <Menu.Dropdown>
                <Menu.Label>Application</Menu.Label>
                <Menu.Item color={primaryColors.DEFAULT} leftSection={<IconSettings size={14} />}>
                    Settings
                </Menu.Item>
                <Menu.Item onClick={() => signOut()} color={primaryColors.DEFAULT} leftSection={<IconLogout2 size={14} />}>
                    Signout
                </Menu.Item>

                <Menu.Divider />

                <Menu.Label>Danger zone</Menu.Label>
                <Menu.Item
                    color="red"
                    leftSection={<IconTrash size={14} />}
                >
                    Delete my account
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
}
