// import React, { useEffect, useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Login from './authentication/Login';
// import Signup from './authentication/Signup';
// import Dashboard from './pages/Dashboard';
// import ResetPassword from './authentication/ResetPassword';
// import ForgotPassword from './authentication/ForgotPassword';
// import AssetMaintenance from './pages/AssetMaster/AssetMaintenance';
// import Assetlist from './pages/AssetMaster/Assetlist';
// import FinishedMaintenance from './pages/AssetMaster/FinishedMaintenance';
// import UnfinishedMaintenance from './pages/AssetMaster/UnfinishedMaintenance';
// import AssetInsurance from './pages/AssetMaster/AssetInsurance';
// import AssetLostList from './pages/AssetMaster/AssetLostList';
// import Employeelist from './pages/EmployeeMaster/Employeelist';
// import Sitelist from './pages/SiteMaster/Sitelist';
// import ClientList from './pages/ClientMaster/ClientList';
// import Vendorlist from './pages/VendorMaster/Vendorlist';
// import CategoryList from './pages/CategoryMaster/CategoryList';
// import ComponentList from './pages/ComponentMaster/Componentlist';
// import FullComponentList from './pages/ComponentMaster/FullComponentList';
// import DeleteList from './pages/DeleteList';
// import BrandList from './pages/BrandMaster/BrandList';
// import ApplicationSetting from './pages/SettingMaster/ApplicationSetting';
// import CategoryAssetList from './pages/CategoryMaster/CategoryAssetList';
// import AssetTransferList from './pages/AssetMaster/AssetTransferList';
// import TransporterList from './pages/AssetMaster/TransporterList';
// import AssetMasterList from './pages/AssetMaster/AssetMasterList';
// import Profile from './pages/SettingMaster/Profile';

// const App = () => {
//   // State to track authentication status
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [username, setUsername] = useState('');
//   const [loading, setLoading] = useState(true); // State to track loading status

//   // Function to check if user is authenticated based on token in localStorage
//   const checkAuth = () => {
//     return localStorage.getItem('token') !== null;
//   };

//   // Update authentication status on component mount
//   useEffect(() => {
//     const isAuthenticated = checkAuth();
//     setIsAuthenticated(isAuthenticated);
//     setLoading(false); // Set loading to false once authentication check is done
//   }, []);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     const username = localStorage.getItem('username');
//     if (token) {
//       setIsAuthenticated(true);
//       setUsername(username);
//     }
//   }, []);

//   // Function to handle logout
//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('username');
//     setIsAuthenticated(false);
//     setUsername('');
//   };

//   const handleLogin = ({ token, username }) => {
//     console.log("Received token:", token);
//     console.log("Received username:", username);

//     localStorage.setItem('token', token);
//     localStorage.setItem('username', username);

//     console.log("Username stored in localStorage:", localStorage.getItem('username'));

//     setIsAuthenticated(true);
//     setUsername(username);
//   };


//   if (loading) {
//     // Loading state, render loading indicator or component
//     return <div>Loading...</div>;
//   }

//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={isAuthenticated ? (<Navigate to="/dashboard" />) : (<Login handleLogin={handleLogin} />)} />
//         <Route path="/signup" element={<Signup/>} />
//         <Route path="/forgotpassword" element={<ForgotPassword />} />
//         <Route path="/reset-password/:token" element={<ResetPassword />} />
//         <Route path="/dashboard" element={isAuthenticated ? (<Dashboard username={username} handleLogout={handleLogout} />) : (<Navigate to="/" replace />)} />
//         <Route path="/brandlist" element={isAuthenticated ? <BrandList username={username} handleLogout={handleLogout} /> : <Navigate to="/" replace />} />
//         <Route path="/deletelist" element={isAuthenticated ? <DeleteList username={username} handleLogout={handleLogout} /> : <Navigate to="/" replace />} />
//         <Route path="/categoryassetlist" element={isAuthenticated ? <CategoryAssetList username={username} handleLogout={handleLogout} /> : <Navigate to="/" replace />} />
//         <Route path="/categorylist" element={isAuthenticated ? <CategoryList username={username} handleLogout={handleLogout} /> : <Navigate to="/" replace />} />
//         <Route path="/componentlist" element={isAuthenticated ? <ComponentList username={username} handleLogout={handleLogout} /> : <Navigate to="/" replace />} />
//         <Route path="/fullcomponentlist" element={isAuthenticated ? <FullComponentList username={username} handleLogout={handleLogout} /> : <Navigate to="/" replace />} />
//         <Route path="/assetlostlist" element={isAuthenticated ? <AssetLostList username={username} handleLogout={handleLogout} /> : <Navigate to="/" replace />} />
//         <Route path="/assetinsurance" element={isAuthenticated ? <AssetInsurance username={username} handleLogout={handleLogout} /> : <Navigate to="/" replace />} />
//         <Route path="/assetMaintenance" element={isAuthenticated ? <AssetMaintenance username={username} handleLogout={handleLogout} /> : <Navigate to="/" replace />} />
//         <Route path="/finishedmaintenance" element={isAuthenticated ? <FinishedMaintenance username={username} handleLogout={handleLogout} /> : <Navigate to="/" replace />} />
//         <Route path="/unfinishedmaintenance" element={isAuthenticated ? <UnfinishedMaintenance username={username} handleLogout={handleLogout} /> : <Navigate to="/" replace />} />
//         <Route path="/clientlist" element={isAuthenticated ? <ClientList username={username} handleLogout={handleLogout} /> : <Navigate to="/" replace />} />
//         <Route path="/sitelist" element={isAuthenticated ? <Sitelist username={username} handleLogout={handleLogout} /> : <Navigate to="/" replace />} />
//         <Route path="/transporterlist" element={isAuthenticated ? <TransporterList username={username} handleLogout={handleLogout} /> : <Navigate to="/" replace />} />
//         {/* Pass username and handleLogout props to Assetlist */}
//         <Route path="/assetlist" element={isAuthenticated ? <Assetlist username={username} handleLogout={handleLogout} /> : <Navigate to="/" replace />} />
//         <Route path="/assetmasterlist" element={isAuthenticated ? <AssetMasterList username={username} handleLogout={handleLogout} /> : <Navigate to="/" replace />} />
//         <Route path="/employeelist" element={isAuthenticated ? <Employeelist username={username} handleLogout={handleLogout} /> : <Navigate to="/" replace />} />
//         <Route path="/vendorlist" element={isAuthenticated ? <Vendorlist username={username} handleLogout={handleLogout} /> : <Navigate to="/" replace />} />
//         <Route path="/applicationsetting" element={isAuthenticated ? <ApplicationSetting username={username} handleLogout={handleLogout}/> : <Navigate to="/" replace />} />
//         <Route path="/profile" element={isAuthenticated ? <Profile username={username} handleLogout={handleLogout}/> : <Navigate to="/" replace />} />
//         <Route path="/assettransfer" element={isAuthenticated ? <AssetTransferList username={username} handleLogout={handleLogout} /> : <Navigate to="/" replace />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;







import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode'; // Correct named import
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './authentication/Login';
import SignUpAsset from './authentication/SignUpAsset';
import Dashboard from './pages/Dashboard';
import ResetPassword from './authentication/ResetPassword';
import ForgotPassword from './authentication/ForgotPassword';
import AssetMaintenance from './pages/AssetMaster/AssetMaintenance';
import Assetlist from './pages/AssetMaster/Assetlist';
import FinishedMaintenance from './pages/AssetMaster/FinishedMaintenance';
import UnfinishedMaintenance from './pages/AssetMaster/UnfinishedMaintenance';
import AssetInsurance from './pages/AssetMaster/AssetInsurance';
import AssetLostList from './pages/AssetMaster/AssetLostList';
import Employeelist from './pages/EmployeeMaster/Employeelist';
import Sitelist from './pages/SiteMaster/Sitelist';
import ClientList from './pages/ClientMaster/ClientList';
import Vendorlist from './pages/VendorMaster/Vendorlist';
import CategoryList from './pages/CategoryMaster/CategoryList';
import ComponentList from './pages/ComponentMaster/Componentlist';
import FullComponentList from './pages/ComponentMaster/FullComponentList';
import DeleteList from './pages/DeleteList';
import BrandList from './pages/BrandMaster/BrandList';
import ApplicationSetting from './pages/SettingMaster/ApplicationSetting';
import CategoryAssetList from './pages/CategoryMaster/CategoryAssetList';
import AssetTransferList from './pages/AssetMaster/AssetTransferList';
import TransporterList from './pages/AssetMaster/TransporterList';
import AssetMasterList from './pages/AssetMaster/AssetMasterList';
import Profile from './pages/SettingMaster/Profile';
import UserDashboard from './pages/UserDashboard';
import PageNotFound from './pages/PageNotFound';


const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [userType, setUserType] = useState(''); // Add userType state
  const [employeeId, setEmployeeId] = useState(''); // Add employeeId state
  const [loading, setLoading] = useState(true);

  const checkAuth = () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        if (decodedToken.exp * 5000 < Date.now()) {
          localStorage.removeItem('token');
          localStorage.removeItem('username');
          localStorage.removeItem('userType');
          localStorage.removeItem('employeeId');
          localStorage.removeItem('fetchemail');
          return false;
        }
        return true;
      } catch (error) {
        return false;
      }
    }
    return false;
  };

  useEffect(() => {
    const isAuthenticated = checkAuth();
    if (isAuthenticated) {
      setUsername(localStorage.getItem('username'));
      setUserType(localStorage.getItem('userType'));
      setEmployeeId(localStorage.getItem('employeeId'));
    }
    setIsAuthenticated(isAuthenticated);
    setLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('userType');
    localStorage.removeItem('employeeId');
    localStorage.removeItem('fetchemail');

    setIsAuthenticated(false);
    setUsername('');
    setUserType(''); // Clear userType on logout
    setEmployeeId(''); // Clear employeeId on logout
  };

  const handleLogin = ({ token, username, userType, employeeId }) => {
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
    localStorage.setItem('userType', userType);
    localStorage.setItem('employeeId', employeeId);
    setIsAuthenticated(true);
    setUsername(username);
    setUserType(userType);
    setEmployeeId(employeeId);
  };

  if (loading) {
    return <div>Loading...</div>;
  }


  return (
    <Router>
      <Routes>
        <Route path="/" element={isAuthenticated ? (<Navigate to={userType === 'user' ? "/userdashboard" : "/dashboard"} replace />) : (<Login handleLogin={handleLogin} />)} />
        {/* <Route path="/signup" element={<Signup />} /> */}
        <Route path="/signup" element={<SignUpAsset />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        {/* Routes accessible by 'user' */}
        {userType === 'user' && (
          <>
            <Route path="/userdashboard" element={isAuthenticated ? <UserDashboard username={username} userType={userType} employeeId={employeeId} handleLogout={handleLogout} /> : <Navigate to="/" replace />} />
          </>
        )}

        {/* Routes accessible by 'manager' or 'admin' */}
        {(userType === 'manager' || userType === 'admin') && (
          <>
            <Route path="/dashboard" element={isAuthenticated ? (<Dashboard username={username} employeeId={employeeId} userType={userType} handleLogout={handleLogout} />) : (<Navigate to="/" replace />)} />
            <Route path="/brandlist" element={isAuthenticated ? <BrandList username={username} userType={userType} employeeId={employeeId} handleLogout={handleLogout} /> : <Navigate to="/" replace />} />
            <Route path="/deletelist" element={isAuthenticated ? <DeleteList username={username} userType={userType} employeeId={employeeId} handleLogout={handleLogout} /> : <Navigate to="/" replace />} />
            <Route path="/categoryassetlist" element={isAuthenticated ? <CategoryAssetList username={username} userType={userType} employeeId={employeeId} handleLogout={handleLogout} /> : <Navigate to="/" replace />} />
            <Route path="/categorylist" element={isAuthenticated ? <CategoryList username={username} userType={userType} employeeId={employeeId} handleLogout={handleLogout} /> : <Navigate to="/" replace />} />
            <Route path="/componentlist" element={isAuthenticated ? <ComponentList username={username} userType={userType} employeeId={employeeId} handleLogout={handleLogout} /> : <Navigate to="/" replace />} />
            <Route path="/fullcomponentlist" element={isAuthenticated ? <FullComponentList username={username} userType={userType} employeeId={employeeId} handleLogout={handleLogout} /> : <Navigate to="/" replace />} />
            <Route path="/assetlostlist" element={isAuthenticated ? <AssetLostList username={username} userType={userType} employeeId={employeeId} handleLogout={handleLogout} /> : <Navigate to="/" replace />} />
            <Route path="/assetinsurance" element={isAuthenticated ? <AssetInsurance username={username} userType={userType} employeeId={employeeId} handleLogout={handleLogout} /> : <Navigate to="/" replace />} />
            <Route path="/assetMaintenance" element={isAuthenticated ? <AssetMaintenance username={username} userType={userType} employeeId={employeeId} handleLogout={handleLogout} /> : <Navigate to="/" replace />} />
            <Route path="/finishedmaintenance" element={isAuthenticated ? <FinishedMaintenance username={username} userType={userType} employeeId={employeeId} handleLogout={handleLogout} /> : <Navigate to="/" replace />} />
            <Route path="/unfinishedmaintenance" element={isAuthenticated ? <UnfinishedMaintenance username={username} userType={userType} employeeId={employeeId} handleLogout={handleLogout} /> : <Navigate to="/" replace />} />
            <Route path="/clientlist" element={isAuthenticated ? <ClientList username={username} userType={userType} employeeId={employeeId} handleLogout={handleLogout} /> : <Navigate to="/" replace />} />
            <Route path="/sitelist" element={isAuthenticated ? <Sitelist username={username} userType={userType} employeeId={employeeId} handleLogout={handleLogout} /> : <Navigate to="/" replace />} />
            <Route path="/transporterlist" element={isAuthenticated ? <TransporterList username={username} userType={userType} employeeId={employeeId} handleLogout={handleLogout} /> : <Navigate to="/" replace />} />
            <Route path="/assetlist" element={isAuthenticated ? <Assetlist username={username} userType={userType} employeeId={employeeId} handleLogout={handleLogout} /> : <Navigate to="/" replace />} />
            <Route path="/assetmasterlist" element={isAuthenticated ? <AssetMasterList username={username} userType={userType} employeeId={employeeId} handleLogout={handleLogout} /> : <Navigate to="/" replace />} />
            <Route path="/employeelist" element={isAuthenticated ? <Employeelist username={username} userType={userType} employeeId={employeeId} handleLogout={handleLogout} /> : <Navigate to="/" replace />} />
            <Route path="/vendorlist" element={isAuthenticated ? <Vendorlist username={username} userType={userType} employeeId={employeeId} handleLogout={handleLogout} /> : <Navigate to="/" replace />} />
            <Route path="/applicationsetting" element={isAuthenticated ? <ApplicationSetting username={username} userType={userType} employeeId={employeeId} handleLogout={handleLogout} /> : <Navigate to="/" replace />} />
            <Route path="/profile" element={isAuthenticated ? <Profile username={username} userType={userType} employeeId={employeeId} handleLogout={handleLogout} /> : <Navigate to="/" replace />} />
            <Route path="/assettransfer" element={isAuthenticated ? <AssetTransferList username={username} userType={userType} employeeId={employeeId} handleLogout={handleLogout} /> : <Navigate to="/" replace />} />
          </>
        )}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
};

export default App;

