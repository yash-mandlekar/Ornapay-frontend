"use client";
import React, { useState } from "react";
import {
  User,
  Package,
  Download,
  MapPin,
  Settings,
  LogOut,
  Mail,
  Phone,
  Edit2,
  Save,
} from "lucide-react";

const MyAccount = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  // This should come from Redux - useAppSelector((state) => state.auth)
  const user = {
    avatar:
      "https://res.cloudinary.com/dpchknrfk/image/upload/v1763292491/avatars/k11bppfozqaw90wvhrrg.webp",
    email: "oabhishekh8@gmail.com",
    name: "Abhishekh",
  };

  // This should come from Redux - useAppSelector((state) => state.cart)
  const cartItems = [
    {
      quantity: 2,
      product: {
        _id: "691cd7678828b2c906d223fa",
        title: "Gold Plated Pearl Necklace",
        price: 2499,
        discountPrice: 1999,
        images: [
          {
            url: "https://dummyimage.com/600x600/f2d18b/ffffff&text=Pearl+Necklace",
            isPrimary: true,
          },
        ],
      },
      variant: {
        _id: "691cd8048828b2c906d22401",
        attributes: [{ key: "length", value: "16 inch" }],
        price: 2599,
        discountPrice: 2199,
      },
    },
  ];

  // Navigation items
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: User },
    { id: "orders", label: "Orders", icon: Package },
    { id: "downloads", label: "Downloads", icon: Download },
    { id: "addresses", label: "Addresses", icon: MapPin },
    { id: "account-details", label: "Account Details", icon: Settings },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardTab user={user} cartItems={cartItems} />;
      case "orders":
        return <OrdersTab />;
      case "downloads":
        return <DownloadsTab />;
      case "addresses":
        return <AddressesTab />;
      case "account-details":
        return <AccountDetailsTab user={user} />;
      default:
        return <DashboardTab user={user} cartItems={cartItems} />;
    }
  };

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #f5f1ed 0%, #ede8e3 100%)",
        minHeight: "100vh",
      }}
    >
      {/* Breadcrumb */}
      <div
        style={{
          backgroundColor: "#f5f1ed",
          borderBottom: "1px solid #e5d9d0",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 style={{ color: "#4F1719", fontSize: "2rem", fontWeight: "600" }}>
            My Account
          </h1>
          <p
            style={{
              color: "#666666",
              fontSize: "0.875rem",
              marginTop: "0.5rem",
            }}
          >
            Home / My Account
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className="lg:w-80 w-full">
            <div
              className="bg-white rounded-2xl  overflow-hidden"
              style={{ border: "1px solid #832729" }}
            >
              {/* User Profile Section */}
              <div
                style={{
                  backgroundColor: "#f5f1ed",
                  padding: "2rem",
                  borderBottom: "1px solid #e5d9d0",
                }}
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-16 h-16 rounded-full overflow-hidden"
                    style={{ border: "3px solid #832729" }}
                  >
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3
                      style={{
                        color: "#4F1719",
                        fontWeight: "600",
                        fontSize: "1.125rem",
                      }}
                    >
                      {user.name}
                    </h3>
                    <p style={{ color: "#666666", fontSize: "0.875rem" }}>
                      {user.email}
                    </p>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div style={{ padding: "1.5rem" }}>
                <nav className="space-y-2">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200"
                        style={{
                          backgroundColor: isActive ? "#832729" : "#f5f1ed",
                          color: isActive ? "#ffffff" : "#666666",
                          border: isActive ? "none" : "1px solid transparent",
                          fontWeight: isActive ? "600" : "400",
                        }}
                      >
                        <Icon size={20} />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}

                  <button
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200"
                    style={{
                      backgroundColor: "#f5f1ed",
                      color: "#832729",
                      border: "1px solid #e5d9d0",
                      fontWeight: "600",
                      marginTop: "1rem",
                    }}
                  >
                    <LogOut size={20} />
                    <span>Logout</span>
                  </button>
                </nav>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">{renderContent()}</div>
        </div>
      </div>
    </div>
  );
};

// Dashboard Tab Component
const DashboardTab = ({ user, cartItems }) => {
  const totalCartValue = cartItems.reduce((sum, item) => {
    const price = item.variant?.discountPrice || item.product.discountPrice;
    return sum + price * item.quantity;
  }, 0);

  return (
    <div className="space-y-6">
      <div
        className="bg-white rounded-2xl  p-8"
        style={{ border: "1px solid #832729" }}
      >
        <h2
          style={{
            color: "#4F1719",
            fontSize: "1.875rem",
            fontWeight: "600",
            marginBottom: "1.5rem",
          }}
        >
          Welcome back, {user.name}!
        </h2>
        <p style={{ color: "#666666", fontSize: "1rem", lineHeight: "1.6" }}>
          From your account dashboard you can view your recent orders, manage
          your shipping and billing addresses, and edit your password and
          account details.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <DashboardCard
            icon={Package}
            title="Items in Cart"
            value={cartItems.length.toString()}
            color="#832729"
          />
          <DashboardCard
            icon={Download}
            title="Cart Value"
            value={`₹${totalCartValue.toLocaleString()}`}
            color="#832729"
          />
          <DashboardCard
            icon={User}
            title="Account Status"
            value="Active"
            color="#832729"
          />
        </div>
      </div>

      {/* Cart Items Preview */}
      {cartItems.length > 0 && (
        <div
          className="bg-white rounded-2xl  overflow-hidden"
          style={{ border: "1px solid #832729" }}
        >
          <div
            style={{
              backgroundColor: "#f5f1ed",
              padding: "1.5rem",
              borderBottom: "1px solid #e5d9d0",
            }}
          >
            <h3
              style={{
                color: "#4F1719",
                fontSize: "1.25rem",
                fontWeight: "600",
              }}
            >
              Current Cart Items
            </h3>
          </div>
          <div className="p-6 space-y-4">
            {cartItems.map((item, index) => (
              <div
                key={index}
                className="flex gap-4 p-4 rounded-xl"
                style={{
                  backgroundColor: "#f5f1ed",
                  border: "1px solid #e5d9d0",
                }}
              >
                <img
                  src={
                    item.product.images.find((img) => img.isPrimary)?.url ||
                    item.product.images[0]?.url
                  }
                  alt={item.product.title}
                  className="w-20 h-20 object-cover rounded-lg"
                  style={{ border: "1px solid #832729" }}
                />
                <div className="flex-1">
                  <h4
                    style={{
                      color: "#4F1719",
                      fontWeight: "600",
                      marginBottom: "0.25rem",
                    }}
                  >
                    {item.product.title}
                  </h4>
                  {item.variant && (
                    <p style={{ color: "#666666", fontSize: "0.875rem" }}>
                      {item.variant.attributes
                        .map((attr) => `${attr.key}: ${attr.value}`)
                        .join(", ")}
                    </p>
                  )}
                  <div className="flex items-center gap-4 mt-2">
                    <p style={{ color: "#832729", fontWeight: "600" }}>
                      ₹
                      {(
                        item.variant?.discountPrice ||
                        item.product.discountPrice
                      ).toLocaleString()}
                    </p>
                    <p style={{ color: "#666666", fontSize: "0.875rem" }}>
                      Qty: {item.quantity}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const DashboardCard = ({ icon: Icon, title, value, color }) => (
  <div
    className="p-6 rounded-xl transition-all duration-200 hover:shadow-lg"
    style={{ backgroundColor: "#f5f1ed", border: "1px solid #e5d9d0" }}
  >
    <Icon size={32} style={{ color }} />
    <h3
      style={{
        color: "#4F1719",
        fontSize: "1.5rem",
        fontWeight: "600",
        marginTop: "1rem",
      }}
    >
      {value}
    </h3>
    <p style={{ color: "#666666", fontSize: "0.875rem", marginTop: "0.25rem" }}>
      {title}
    </p>
  </div>
);

// Orders Tab Component - You need to add orders to Redux
const OrdersTab = () => (
  <div
    className="bg-white rounded-2xl  overflow-hidden"
    style={{ border: "1px solid #832729" }}
  >
    <div
      style={{
        backgroundColor: "#f5f1ed",
        padding: "1.5rem",
        borderBottom: "1px solid #e5d9d0",
      }}
    >
      <h2 style={{ color: "#4F1719", fontSize: "1.5rem", fontWeight: "600" }}>
        My Orders
      </h2>
    </div>

    <div className="p-6">
      <p style={{ color: "#666666", textAlign: "center", padding: "3rem" }}>
        No orders found. Complete your first purchase to see orders here.
      </p>
    </div>
  </div>
);

// Downloads Tab Component
const DownloadsTab = () => (
  <div
    className="bg-white rounded-2xl  p-8"
    style={{ border: "1px solid #832729" }}
  >
    <h2
      style={{
        color: "#4F1719",
        fontSize: "1.5rem",
        fontWeight: "600",
        marginBottom: "1.5rem",
      }}
    >
      Downloads
    </h2>
    <p style={{ color: "#666666", textAlign: "center", padding: "3rem" }}>
      You don&apos;t have any downloads yet
    </p>
  </div>
);

// Addresses Tab Component - You need to add addresses to user object
const AddressesTab = () => (
  <div
    className="bg-white rounded-2xl  p-8"
    style={{ border: "1px solid #832729" }}
  >
    <h2
      style={{
        color: "#4F1719",
        fontSize: "1.5rem",
        fontWeight: "600",
        marginBottom: "1.5rem",
      }}
    >
      My Addresses
    </h2>
    <p style={{ color: "#666666", textAlign: "center", padding: "3rem" }}>
      No addresses saved. Add your shipping and billing addresses.
    </p>
    <div className="flex justify-center">
      <button
        className="px-8 py-3 rounded-lg font-semibold transition-all duration-200 hover:shadow-xl flex items-center gap-2"
        style={{
          backgroundColor: "#832729",
          color: "#ffffff",
        }}
      >
        <MapPin size={20} />
        Add New Address
      </button>
    </div>
  </div>
);

// Account Details Tab Component
const AccountDetailsTab = ({ user }) => {
  const [formData, setFormData] = useState({
    firstName: user.name.split(" ")[0] || "",
    lastName: user.name.split(" ")[1] || "",
    email: user.email,
    country: "India",
  });

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleSubmit = () => {
    console.log("Profile updated:", formData);
    alert("Profile updated successfully!");
  };

  const handlePasswordSubmit = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log("Password changed");
    alert("Password changed successfully!");
  };

  return (
    <div className="space-y-6">
      {/* Profile Details */}
      <div
        className="bg-white rounded-2xl  p-8"
        style={{ border: "1px solid #832729" }}
      >
        <h2
          style={{
            color: "#4F1719",
            fontSize: "1.5rem",
            fontWeight: "600",
            marginBottom: "1.5rem",
          }}
        >
          Profile Details
        </h2>

        <div className="space-y-5">
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label
                style={{
                  color: "#4F1719",
                  fontWeight: "600",
                  display: "block",
                  marginBottom: "0.5rem",
                }}
              >
                First Name <span style={{ color: "#d32f2f" }}>*</span>
              </label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
                className="w-full px-4 py-3 rounded-lg outline-none transition-all duration-200"
                style={{
                  border: "1px solid #e5d9d0",
                  backgroundColor: "#ffffff",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#832729")}
                onBlur={(e) => (e.target.style.borderColor = "#e5d9d0")}
              />
            </div>

            <div>
              <label
                style={{
                  color: "#4F1719",
                  fontWeight: "600",
                  display: "block",
                  marginBottom: "0.5rem",
                }}
              >
                Last Name
              </label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
                className="w-full px-4 py-3 rounded-lg outline-none transition-all duration-200"
                style={{
                  border: "1px solid #e5d9d0",
                  backgroundColor: "#ffffff",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#832729")}
                onBlur={(e) => (e.target.style.borderColor = "#e5d9d0")}
              />
            </div>
          </div>

          <div>
            <label
              style={{
                color: "#4F1719",
                fontWeight: "600",
                display: "block",
                marginBottom: "0.5rem",
              }}
            >
              Email <span style={{ color: "#d32f2f" }}>*</span>
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full px-4 py-3 rounded-lg outline-none transition-all duration-200"
              style={{
                border: "1px solid #e5d9d0",
                backgroundColor: "#ffffff",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#832729")}
              onBlur={(e) => (e.target.style.borderColor = "#e5d9d0")}
            />
          </div>

          <div>
            <label
              style={{
                color: "#4F1719",
                fontWeight: "600",
                display: "block",
                marginBottom: "0.5rem",
              }}
            >
              Country/Region <span style={{ color: "#d32f2f" }}>*</span>
            </label>
            <select
              value={formData.country}
              onChange={(e) =>
                setFormData({ ...formData, country: e.target.value })
              }
              className="w-full px-4 py-3 rounded-lg outline-none transition-all duration-200"
              style={{
                border: "1px solid #e5d9d0",
                backgroundColor: "#ffffff",
              }}
            >
              <option value="India">India</option>
              <option value="USA">United States</option>
              <option value="UK">United Kingdom</option>
            </select>
          </div>

          <button
            onClick={handleSubmit}
            className="px-8 py-3 rounded-lg font-semibold transition-all duration-200 hover:shadow-xl flex items-center gap-2"
            style={{
              backgroundColor: "#832729",
              color: "#ffffff",
            }}
          >
            <Save size={20} />
            Save Changes
          </button>
        </div>
      </div>

      {/* Password Change */}
      <div
        className="bg-white rounded-2xl  p-8"
        style={{ border: "1px solid #832729" }}
      >
        <h2
          style={{
            color: "#4F1719",
            fontSize: "1.5rem",
            fontWeight: "600",
            marginBottom: "1.5rem",
          }}
        >
          Change Password
        </h2>

        <div className="space-y-5">
          <div>
            <label
              style={{
                color: "#4F1719",
                fontWeight: "600",
                display: "block",
                marginBottom: "0.5rem",
              }}
            >
              Current Password
            </label>
            <input
              type="password"
              value={passwordData.oldPassword}
              onChange={(e) =>
                setPasswordData({
                  ...passwordData,
                  oldPassword: e.target.value,
                })
              }
              className="w-full px-4 py-3 rounded-lg outline-none transition-all duration-200"
              style={{
                border: "1px solid #e5d9d0",
                backgroundColor: "#ffffff",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#832729")}
              onBlur={(e) => (e.target.style.borderColor = "#e5d9d0")}
            />
          </div>

          <div>
            <label
              style={{
                color: "#4F1719",
                fontWeight: "600",
                display: "block",
                marginBottom: "0.5rem",
              }}
            >
              New Password
            </label>
            <input
              type="password"
              value={passwordData.newPassword}
              onChange={(e) =>
                setPasswordData({
                  ...passwordData,
                  newPassword: e.target.value,
                })
              }
              className="w-full px-4 py-3 rounded-lg outline-none transition-all duration-200"
              style={{
                border: "1px solid #e5d9d0",
                backgroundColor: "#ffffff",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#832729")}
              onBlur={(e) => (e.target.style.borderColor = "#e5d9d0")}
            />
          </div>

          <div>
            <label
              style={{
                color: "#4F1719",
                fontWeight: "600",
                display: "block",
                marginBottom: "0.5rem",
              }}
            >
              Confirm New Password
            </label>
            <input
              type="password"
              value={passwordData.confirmPassword}
              onChange={(e) =>
                setPasswordData({
                  ...passwordData,
                  confirmPassword: e.target.value,
                })
              }
              className="w-full px-4 py-3 rounded-lg outline-none transition-all duration-200"
              style={{
                border: "1px solid #e5d9d0",
                backgroundColor: "#ffffff",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#832729")}
              onBlur={(e) => (e.target.style.borderColor = "#e5d9d0")}
            />
          </div>

          <button
            onClick={handlePasswordSubmit}
            className="px-8 py-3 rounded-lg font-semibold transition-all duration-200 hover:shadow-xl flex items-center gap-2"
            style={{
              backgroundColor: "#832729",
              color: "#ffffff",
            }}
          >
            <Save size={20} />
            Update Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
