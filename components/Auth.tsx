import { Button, Dialog, Flex, TextField, Text, Link, Spinner } from '@radix-ui/themes';
import React, { useState } from 'react';
import { auth } from './../lib/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Auth = ({ open, onClose }: { open: boolean, onClose: () => void }) => {
  const [state, setState] = useState('Sign In');
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');


  const toggleState = () => {
    setState(state === 'Sign In' ? 'Create Account' : 'Sign In');
  };

  const handleSignIn = async () => {
    setIsLoading(true)
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('User Successfully Signed in', { position: 'bottom-right' });
      //console.log('User signed in');
      onClose();
    } catch (err) {
      console.error(err);
      toast.error('Error Signing in', { position: 'bottom-right' });
    }
    finally {
      setIsLoading(false);
    }
  };

  const handleCreateAccount = async () => {
    setIsLoading(true)
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success('Successfully Signed Up to the System', { position: 'bottom-right' });
      //console.log('Account created');
      toggleState();
    } catch (err) {
      console.error(err);
      toast.error('Error Signing Up', { position: 'bottom-right' });
    }
    finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Content maxWidth="450px">
        <Dialog.Title>{state === "Sign In" ? "Sign Into Your Account" : "Create New Account"}</Dialog.Title>

        <Flex direction="column" gap="3">
          {state === "Create Account" && (
            <label>
              <Text as="div" size="2" mb="1" weight="bold">Name</Text>
              <TextField.Root
                placeholder="Enter your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
          )}

          <label>
            <Text as="div" size="2" mb="1" weight="bold">Email</Text>
            <TextField.Root
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label>
            <Text as="div" size="2" mb="1" weight="bold">Password</Text>
            <TextField.Root
              placeholder="Enter your Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </Flex>

        <Flex gap="3" mt="4" justify="end">
          <Button variant="soft" color="gray" onClick={onClose}>Cancel</Button>
          {state === "Sign In" && <Button onClick={handleSignIn} disabled={isLoading}>Sign In { isLoading && <Spinner size='1'/>}</Button>}
          {state === 'Create Account' && <Button onClick={handleCreateAccount} disabled = {isLoading}>Sign Up { isLoading && <Spinner size='1'/>}</Button>}
        </Flex>

        <Flex justify="center" mt="4">
          <Link onClick={toggleState} className='cursor-pointer'>
            {state === "Sign In" ? "Create an Account" : "Already have an Account?"}
          </Link>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default Auth;
