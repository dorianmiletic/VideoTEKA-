import useAuthStore from "../store/authStore";

const Profile = () => {
  const { user } = useAuthStore();

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-10 text-white">
        <h1 className="text-xl text-gray-400">Učitavanje profila...</h1>
      </div>
    );
  }
console.log(user)
  return (
    <div className="container mx-auto px-4 py-10 text-white">
      <h1 className="text-4xl font-bold mb-6">👤 Moj profil</h1>

      <div className="bg-dark-light p-6 rounded-lg max-w-lg space-y-4">
        <div>
          <p className="text-gray-400 text-sm">Korisničko ime</p>
          <p className="text-xl font-semibold">{user.username}</p>
        </div>

        <div>
          <p className="text-gray-400 text-sm">Email</p>
          <p className="text-xl font-semibold">{user.email}</p>
        </div>

        <div>
          <p className="text-gray-400 text-sm">Uloga</p>
          <p className="text-xl font-semibold">{user.role}</p>
        </div>

        <div>
          <p className="text-gray-400 text-sm">Račun kreiran</p>
          <p className="text-sm text-gray-400">
            Datum registracije:{" "}
            {user?.createdAt
              ? new Date(user.createdAt).toLocaleDateString("hr-HR")
              : "Učitavanje..."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
