import { Button, Dialog, Flex, TextField, Text, Link } from '@radix-ui/themes';
import React, { useState } from 'react';

const Auth = () => {
  const [state, setState] = useState('Sign In');

  const toggleState = () => {
    setState(state === 'Sign In' ? 'Create Account' : 'Sign In');
  };

  const handleSignIn = () => {
    console.log('Sign In');
  };

  const handleCreateAccount = () => {
    console.log('Create Account');
    toggleState();
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button variant="soft" className="ml-auto">Sign In</Button>
      </Dialog.Trigger>
      <Dialog.Content maxWidth="450px">
        <Dialog.Title>{state === "Sign In" ? "Sign Into Your Account" : "Create New Account"}</Dialog.Title>

        <Flex direction="column" gap="3">
          {state === "Create Account" && (
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Name
              </Text>
              <TextField.Root
                placeholder="Enter your Name"
              />
            </label>
          )}

          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Email
            </Text>
            <TextField.Root
              defaultValue="freja@example.com"
              placeholder="Enter your email"
            />
          </label>

          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Password
            </Text>
            <TextField.Root
              placeholder="Enter your Password"
            />
          </label>
        </Flex>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>

          {state === "Sign In" && (
            <Dialog.Close>
                <Button onClick={handleSignIn}>
                    Sign In
                </Button>
            </Dialog.Close>
          )}
          {state === 'Create Account' && (
              <Button onClick={handleCreateAccount}>Sign Up</Button>
          )}
        </Flex>
        <Flex justify="center" mt="4" >
          <Link onClick={toggleState} className='cursor-pointer'>
            {state === "Sign In" ? "Create an Account" : "Already have an Account?"}
          </Link>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default Auth;
