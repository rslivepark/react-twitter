//
// component that request UserInfo from Firebase
// 로그인한 사용자가 누구인지 물어봄..
//

import { Navigate } from 'react-router-dom';
import { auth } from '../firebase';

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = auth.currentUser;
  if (!user) {
    // user === null
    return <Navigate to='/login' />;
  }
  return children;
}
