import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode'; // Correct named import
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './authentication/Login';
import Dashboard from './pages/Dashboard';
import ResetPassword from './authentication/ResetPassword';
import ForgotPassword from './authentication/ForgotPassword';
import AssetMaintenance from './pages/AssetMaster/AssetMaintenance';
import Assetlist from './pages/AssetMaster/Assetlist';
import FinishedMaintenance from './pages/AssetMaster/FinishedMaintenance';
import UnfinishedMaintenance from './pages/AssetMaster/UnfinishedMaintenance';
import AssetInsurance from './pages/Insurance/AssetInsurance';
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
import AssetMasterList from './pages/AssetMaster/AssetMasterList';
import Profile from './pages/SettingMaster/Profile';
import UserDashboard from './pages/UserDashboard';
import PageNotFound from './pages/PageNotFound';
import AllAssetReport from './pages/Report/AllAssetReport';
import CategoryReport from './pages/Report/CategoryAssetReport';
import VendorAssetReport from './pages/Report/VendorAssetReport';
import SiteAssetReport from './pages/Report/SiteAssetReport';
import EmployeeAssetReport from './pages/Report/EmployeeAssetReport';
import ClientAssetReport from './pages/Report/ClientAssetReport';
import AssetLostReport from './pages/Report/AssetLostReport';
import InsuranceExpiry from './pages/Insurance/InsuranceExpiry';
import InsuranceReport from './pages/Report/InsuranceReport';
import InsuranceExpiryReport from './pages/Report/InsuranceExpiryReport';
import MaintenanceReport from './pages/Report/MaintenanceReport';
import TransporterList from './pages/Transport/TransporterList';
import BrandReport from './pages/Report/BrandReport';
import Signup from './authentication/Signup';


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

        // Expiry time is in seconds, convert to milliseconds by multiplying by 1000
        if (decodedToken.exp * 1000 < Date.now()) {
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
        <Route path="/signup" element={<Signup />} />
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
            <Route path="/assetinsurenceexpiry" element={isAuthenticated ? <InsuranceExpiry username={username} userType={userType} employeeId={employeeId} handleLogout={handleLogout} /> : <Navigate to="/" replace />} />
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
            <Route path="/allassetreport" element={isAuthenticated ? <AllAssetReport username={username} userType={userType} employeeId={employeeId} handleLogout={handleLogout} /> : <Navigate to="/" replace />} />
            <Route path="/categoryreport" element={isAuthenticated ? <CategoryReport username={username} userType={userType} employeeId={employeeId} handleLogout={handleLogout} /> : <Navigate to="/" replace />} />
            <Route path="/vendorreport" element={isAuthenticated ? <VendorAssetReport username={username} userType={userType} employeeId={employeeId} handleLogout={handleLogout} /> : <Navigate to="/" replace />} />
            <Route path="/sitereport" element={isAuthenticated ? <SiteAssetReport username={username} userType={userType} employeeId={employeeId} handleLogout={handleLogout} /> : <Navigate to="/" replace />} />
            <Route path="/employeereport" element={isAuthenticated ? <EmployeeAssetReport username={username} userType={userType} employeeId={employeeId} handleLogout={handleLogout} /> : <Navigate to="/" replace />} />
            <Route path="/clientreport" element={isAuthenticated ? <ClientAssetReport username={username} userType={userType} employeeId={employeeId} handleLogout={handleLogout} /> : <Navigate to="/" replace />} />
            <Route path="/assetlostreport" element={isAuthenticated ? <AssetLostReport username={username} userType={userType} employeeId={employeeId} handleLogout={handleLogout} /> : <Navigate to="/" replace />} />
            <Route path="/insurancereport" element={isAuthenticated ? <InsuranceReport username={username} userType={userType} employeeId={employeeId} handleLogout={handleLogout} /> : <Navigate to="/" replace />} />
            <Route path="/insuranceexpiryreport" element={isAuthenticated ? <InsuranceExpiryReport username={username} userType={userType} employeeId={employeeId} handleLogout={handleLogout} /> : <Navigate to="/" replace />} />
            <Route path="/maintenancereport" element={isAuthenticated ? <MaintenanceReport username={username} userType={userType} employeeId={employeeId} handleLogout={handleLogout} /> : <Navigate to="/" replace />} />
            <Route path="/brandreport" element={isAuthenticated ? <BrandReport username={username} userType={userType} employeeId={employeeId} handleLogout={handleLogout} /> : <Navigate to="/" replace />} />
          </>
        )}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
};

export default App;

