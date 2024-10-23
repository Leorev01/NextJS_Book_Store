import { Button } from './ui/button';
import { useSession } from 'next-auth/react';
import Cart from './Cart';
import OrderSection from './OrderSection';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const AccountUserPage = ({ handleLogout }: { handleLogout: () => void }) => {
  const { data: session } = useSession(); // Use useSession to get session data
  const userDetails = session?.user;
  const [auth, setAuth] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Fetch user role from the API
  useEffect(() => {
    const getUser = async () => {
      if (!userDetails?.email) {
        setIsLoading(false);
        return; // If email is not available, skip the request
      }
      
      try {
        // Use POST request to fetch user data
        const response = await axios.post('/api/get-user', {
          email: userDetails.email, // Send email in the body
        });

        if (response.data.user) {
          setAuth(response.data.user.role);
        }
      } catch (error) {
        console.error('Error fetching user data:'+error);
      } finally {
        setIsLoading(false); // Ensure loading state is false after fetching
      }
    };

    getUser();
  }, [userDetails]); // Add userDetails as a dependency

  // Show loading indicator while fetching user details
  if (isLoading) {
    return <p>Loading...</p>; // Simple loading indicator
  }

  if (!userDetails) {
    return (
      <div>
        <Button className='w-min self-center' onClick={handleLogout}>
          Logout
        </Button>
        <p>User not found</p>
      </div>
    );
  }

  return (
    <section className='text-center flex flex-col'>
      <h1>Welcome {userDetails.name}</h1>
      <Button className='w-min self-center' onClick={handleLogout}>
        Logout
      </Button>
      {auth === 'admin' && <Button className='w-min self-center' onClick={() => router.push('/dashboard')}>Dashboard</Button>}
      <div className='self-center flex flex-col mt-10 w-[20rem]'>
        <h1 className='text-3xl mb-3'>Profile</h1>
        {/*eslint-disable-next-line @next/next/no-img-element*/}
        {userDetails.image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={userDetails.image as string}
            alt="profile image"
            width={50}
            height={50}
            className='self-center'
          />
        )}
        <p className='self-start'>Name: <strong>{userDetails.name}</strong></p>
        <p className='self-start'>Email: <strong>{userDetails.email}</strong></p>        
      </div>

      <div className='flex flex-row mt-10 w-[100vw] justify-evenly'>
        <div>
          <h1 className='text-3xl mb-3'>Recent Orders</h1>
          <OrderSection />
        </div>
        <div>
          <h1 className='text-3xl mb-3'>Cart</h1>
          <Cart profile={true} />
        </div>
      </div>
    </section>
  );
};

export default AccountUserPage;
