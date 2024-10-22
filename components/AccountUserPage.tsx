import React, { useEffect} from 'react';
import { Button } from './ui/button';
import { useSession } from 'next-auth/react';
import Cart from './Cart';
import OrderSection from './OrderSection';

const AccountUserPage = ({ handleLogout }: { handleLogout: () => void }) => {
  const { data: session, status } = useSession(); // Use useSession to get session data

  useEffect(() => {
    // Set loading to false immediately after getting the session
    if (status !== 'loading') {
    }
    console.log(session);
  }, [status]);

  const userDetails = session?.user;


  // Show loading indicator while fetching user details
  if (!userDetails) {
    return <div>
        <Button className='w-min self-center' onClick={handleLogout}>Logout</Button>
        <p>User not found</p>
      </div>; // Customize this loading indicator as needed
  }


  return (
    <section className='text-center flex flex-col'>
      <h1>Welcome {userDetails.name}</h1>
      <Button className='w-min self-center' onClick={handleLogout}>Logout</Button>
      <div className='self-center flex flex-col mt-10 w-[20rem]'>
        <h1 className='text-3xl mb-3'>Profile</h1>
        {/*eslint-disable-next-line @next/next/no-img-element*/}
        {userDetails.image && <img src={userDetails.image as string} alt="profile image" width={50} height={50} className='self-center'/>}
        <p className='self-start'>Name: <strong>{userDetails.name}</strong></p>
        <p className='self-start'>Email: <strong>{userDetails.email}</strong></p>        
      </div>

      <div className='flex flex-row mt-10 w-[100vw] justify-evenly'>
        <div>
          <h1 className='text-3xl mb-3'>Recent Orders</h1>
          <OrderSection/>
        </div>
        <div>
          <h1 className='text-3xl mb-3'>Cart</h1>
          <Cart profile={true}/>
        </div>
      </div>      

    </section>
  );
};

export default AccountUserPage;
