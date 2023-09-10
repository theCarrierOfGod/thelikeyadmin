import React, { Suspense } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Preloader from './Preloader';
import { Auth } from './contexts/Auth';
import { Hook } from './contexts/Hook';
import { MustBeOut } from './contexts/MustBeOut';
import { MustLogin } from './contexts/MustLogin';
import { User } from './contexts/User';
import { Promotion } from './contexts/Promotions';
import { Tasks } from './contexts/Tasks';
import { Wallet } from './contexts/Wallet';
import { useEffect } from 'react';
import Network from './Network';
import Admindashboard from './admin/Admindashboard';
import Users from './admin/Users';
import ApprovedProofs from './admin/Tasks/ApprovedProofs';
import RejectedProofs from './admin/Tasks/RejectedProofs';
import PendingProofs from './admin/Tasks/PendingProofs';
import SignIn from './pages/signIn/SignIn';
import AddCategories from './admin/AddCategories';
import Categories from './admin/Categories';


function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);

    return () => {
      return true;
    }
  }, [location.key]);


  return (
    <Hook>
      <Network />
      <Auth>
        <User>
          <Promotion>
            <Tasks>
              <Wallet>
                <Routes>
                  <Route
                    exact
                    path="/"
                    element={
                      <Suspense fallback={<Preloader />}>
                        <MustLogin>
                          <Admindashboard />
                        </MustLogin>
                      </Suspense>
                    }
                  />

                  <Route
                    exact
                    path="/dashboard"
                    element={
                      <Suspense fallback={<Preloader />}>
                        <MustLogin>
                          <Admindashboard />
                        </MustLogin>
                      </Suspense>
                    }
                  />

                  <Route
                    exact
                    path="/users"
                    element={
                      <Suspense fallback={<Preloader />}>
                        <MustLogin>
                          <Users />
                        </MustLogin>
                      </Suspense>
                    }
                  />

                  <Route
                    exact
                    path="/proofs/approved"
                    element={
                      <Suspense fallback={<Preloader />}>
                        <MustLogin>
                          <ApprovedProofs />
                        </MustLogin>
                      </Suspense>
                    }
                  />

                  <Route
                    exact
                    path="/proofs/rejected"
                    element={
                      <Suspense fallback={<Preloader />}>
                        <MustLogin>
                          <RejectedProofs />
                        </MustLogin>
                      </Suspense>
                    }
                  />
                  <Route
                    exact
                    path="/proofs/pending"
                    element={
                      <Suspense fallback={<Preloader />}>
                        <MustLogin>
                          <PendingProofs />
                        </MustLogin>
                      </Suspense>
                    }
                  />
                  <Route
                    exact
                    path="/new/categories"
                    element={
                      <Suspense fallback={<Preloader />}>
                        <MustLogin>
                          <AddCategories />
                        </MustLogin>
                      </Suspense>
                    }
                  />
                  <Route
                    exact
                    path="/categories"
                    element={
                      <Suspense fallback={<Preloader />}>
                        <MustLogin>
                          <Categories />
                        </MustLogin>
                      </Suspense>
                    }
                  />
                </Routes>
              </Wallet>
            </Tasks>
          </Promotion>
        </User>
      </Auth >

      <Auth>
        <User>
          <Routes>
            {/* sign user in starts  */}
            <Route
              exact
              path="/sign-in"
              element={
                <Suspense fallback={<Preloader />}>
                  <MustBeOut>
                    <SignIn />
                  </MustBeOut>
                </Suspense>
              }
            />
            {/* sign user in ends  */}

          </Routes>
        </User>
      </Auth>

    </Hook >
  );
}

export default App;
