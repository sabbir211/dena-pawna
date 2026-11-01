import { useContext, useState } from "react";
import { FiCamera, FiMail, FiPhone, FiSave, FiUser } from "react-icons/fi";
import { toast } from "react-toastify";
import { AuthContext } from "../Provider/AuthProvider";
import UploadImage from "../Utils/UploadImage";

export default function Profile() {
  const { user, dbUser, updateUserProfile } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [saving, setSaving] = useState(false);

  const currentProfile = profile || {
    name: dbUser?.name || user?.displayName || "",
    phone: dbUser?.phone || "",
    photoUrl: dbUser?.photoUrl || user?.photoURL || "",
  };

  function handlePhotoChange(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please choose an image file.");
      return;
    }

    setSelectedPhoto(file);
    setProfile((current) => ({
      ...current,
      photoUrl: URL.createObjectURL(file),
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSaving(true);

    try {
      let photoUrl = currentProfile.photoUrl;

      if (selectedPhoto) {
        const token = await user.getIdToken();
        const uploadedPhoto = await UploadImage(selectedPhoto, token, "profiles");
        photoUrl = uploadedPhoto.url;
      }

      await updateUserProfile({
        
        displayName: currentProfile.name,
        phone: currentProfile.phone,
        photoURL: photoUrl,
      });

      setSelectedPhoto(null);
      setProfile((current) => ({ ...current, photoUrl }));
      toast.success("Profile updated successfully.");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSaving(false);
    }
  }

  if (!user || !dbUser) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-error">Unable to load your profile.</p>
      </div>
    );
  }

  const initials = currentProfile.name?.charAt(0).toUpperCase() || "U";

  return (
    <section className="bg-base-200 px-4 py-10 md:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Account settings
          </p>
          <h1 className="mt-2 text-3xl font-bold">Your profile</h1>
          <p className="mt-2 text-base-content/70">
            Update your photo, name, and phone number.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="card border border-base-300 bg-base-100 shadow-sm"
        >
          <div className="card-body gap-6">
            <div className="flex flex-col items-center gap-4 border-b border-base-300 pb-6 sm:flex-row">
              <div className="avatar">
                <div className="flex h-28 w-28 items-center justify-center rounded-full bg-primary text-4xl font-bold text-primary-content">
                  {currentProfile.photoUrl ? (
                    <img
                      src={currentProfile.photoUrl}
                      alt={`${currentProfile.name || "User"} profile`}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    initials
                  )}
                </div>
              </div>
              <div>
                <label htmlFor="profile-photo" className="btn btn-outline btn-sm">
                  <FiCamera /> Change photo
                </label>
                <input
                  id="profile-photo"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handlePhotoChange}
                />
                <p className="mt-2 text-xs text-base-content/60">
                  JPG, PNG, or WEBP images are supported.
                </p>
              </div>
            </div>

            <label className="form-control">
              <span className="label-text mb-1">Full name</span>
              <label className="input input-bordered flex items-center gap-2">
                <FiUser className="text-base-content/50" />
                <input
                  required
                  name="name"
                  value={currentProfile.name}
                  onChange={(event) =>
                    setProfile({ ...currentProfile, name: event.target.value })
                  }
                  className="grow"
                />
              </label>
            </label>

            <label className="form-control">
              <span className="label-text mb-1">Email</span>
              <label className="input input-bordered flex items-center gap-2 opacity-70">
                <FiMail className="text-base-content/50" />
                <input value={user.email || ""} readOnly className="grow" />
              </label>
              <span className="label-text-alt mt-1 text-base-content/60">
                Email changes are managed through your sign-in provider.
              </span>
            </label>

            <label className="form-control">
              <span className="label-text mb-1">Phone number</span>
              <label className="input input-bordered flex items-center gap-2">
                <FiPhone className="text-base-content/50" />
                <input
                  type="tel"
                  name="phone"
                  value={currentProfile.phone}
                  onChange={(event) =>
                    setProfile({ ...currentProfile, phone: event.target.value })
                  }
                  placeholder="+880 1XXX-XXXXXX"
                  className="grow"
                />
              </label>
            </label>

            <div className="card-actions justify-end border-t border-base-300 pt-5">
              <button type="submit" className="btn btn-primary" disabled={saving}>
                {saving ? (
                  <span className="loading loading-spinner loading-sm" />
                ) : (
                  <FiSave />
                )}
                {saving ? "Saving..." : "Save changes"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
