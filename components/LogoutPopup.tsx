'use client';
import { AlertDialog, Button, Flex } from '@radix-ui/themes'
import React from 'react'

interface LogoutPopupProps {
	handleLogOut: () => void;
}

const LogoutPopup: React.FC<LogoutPopupProps> = ({ handleLogOut }) => {

  return (
    <AlertDialog.Root>
		<AlertDialog.Trigger>
			<Button variant="soft" className="ml-auto">Log out</Button>
		  </AlertDialog.Trigger>
		  
		  <AlertDialog.Content maxWidth="450px">
			  <AlertDialog.Title>Logging Out.</AlertDialog.Title>
		<AlertDialog.Description size="2">
			Are you sure? You want to Logout from the system
		</AlertDialog.Description>

		<Flex gap="3" mt="4" justify="end">
			<AlertDialog.Cancel>
				<Button variant="soft" color="gray">
					Cancel
				</Button>
			</AlertDialog.Cancel>
			<AlertDialog.Action>
				<Button variant="solid" color="red"  onClick={handleLogOut}>
					Yes
				</Button>
			</AlertDialog.Action>
		</Flex>
	</AlertDialog.Content>
</AlertDialog.Root>

  )
}

export default LogoutPopup