import { Button, Dialog, Flex, TextField, Text, Link, Spinner } from '@radix-ui/themes';
import React, { useState } from 'react';
import { auth } from './../lib/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, User } from 'firebase/auth';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
const db = getFirestore();

const Auth = ({ open, onClose,onLoginSuccess }: { open: boolean, onClose: () => void, onLoginSuccess?: (user: User) => void }) => {
  const [state, setState] = useState('Sign In');
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [warning, setWarning] = useState('');

  const toggleState = () => {
    setState(state === 'Sign In' ? 'Create Account' : 'Sign In');
    setWarning("");
  };

  const sanitizeInput = (input: string): string => {
    const pattern = /[<>]/g;
    if (pattern.test(input)) {
      setWarning("You cannot enter symbols like < or >");
    } else {
      setWarning("");
    }
    return input.replace(pattern, "").trim();
  };

  const handleInputChange = (
    setter: React.Dispatch<React.SetStateAction<string>>
  ) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawInput = e.target.value;
    const sanitized = sanitizeInput(rawInput);
    setter(sanitized);
  };

  const handleSignIn = async () => {
    setIsLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      const idTokenResult = await user.getIdTokenResult();
      Cookies.set('firebaseToken', idTokenResult.token);
  
      // Fetch user role from Firestore using UID
      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);
  
      let role = "Guest";
      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        role = userData.role ?? "normal user";
      }
  
      //console.log("User Role:", role);
      localStorage.setItem("userRole", role);
      onLoginSuccess?.(user);
      toast.success('User Successfully Signed in', { position: 'bottom-right' });
      onClose();
    } catch (err) {
      let errorMessage = 'Error Signing in';

      if (typeof err === 'object' && err !== null) {
        const error = err as { code?: string; message?: string };
        if (error.code === 'auth/password-does-not-meet-requirements') {
          errorMessage = 'Password must contain at least 8 characters, a number, and a special character.';
        } else if (error.code === 'auth/user-not-found') {
          errorMessage = 'No user found with this email.';
        } else if (error.code === 'auth/wrong-password') {
          errorMessage = 'Incorrect password. Please try again.';
        } else if (error.message) {
          errorMessage = error.message;
        }
      }
      toast.error(errorMessage, { position: 'bottom-right',pauseOnHover:true });
    } finally {
      setIsLoading(false);
    }
  };
  

  const handleCreateAccount = async () => {
    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const token = await userCredential.user.getIdToken();
      Cookies.set('firebaseToken', token);
      toast.success('Successfully Signed Up to the System', { position: 'bottom-right' });
      toggleState();
    } catch (err) {
      let errorMessage = 'Error Signing in';

      if (typeof err === 'object' && err !== null) {
        const error = err as { code?: string; message?: string };
        if (error.code === 'auth/password-does-not-meet-requirements') {
          errorMessage = 'Password must contain at least 8 characters, a number, and a special character.';
        } else if (error.code === 'auth/user-not-found') {
          errorMessage = 'No user found with this email.';
        } else if (error.code === 'auth/wrong-password') {
          errorMessage = 'Incorrect password. Please try again.';
        } else if (error.message) {
          errorMessage = error.message;
        }
      }
      toast.error(errorMessage, {
        position: 'bottom-right', pauseOnHover:true
        
       });
    } finally {
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
                onChange={handleInputChange(setName)}
              />
            </label>
          )}

          <label>
            <Text as="div" size="2" mb="1" weight="bold">Email</Text>
            <TextField.Root
              placeholder="Enter your email"
              value={email}
              onChange={handleInputChange(setEmail)}
            />
          </label>

          <label>
            <Text as="div" size="2" mb="1" weight="bold">Password</Text>
            <TextField.Root
              placeholder="Enter your Password"
              type="password"
              value={password}
              onChange={handleInputChange(setPassword)}
            />
          </label>

          {warning && (
            <Text as="p" size="1" color="red" mt="1">
              {warning}
            </Text>
          )}
        </Flex>

        <Flex gap="3" mt="4" justify="end">
          <Button variant="soft" color="gray" onClick={onClose}>Cancel</Button>
          {state === "Sign In" && <Button onClick={handleSignIn} disabled={isLoading}>Sign In {isLoading && <Spinner size='1' />}</Button>}
          {state === 'Create Account' && <Button onClick={handleCreateAccount} disabled={isLoading}>Sign Up {isLoading && <Spinner size='1' />}</Button>}
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
