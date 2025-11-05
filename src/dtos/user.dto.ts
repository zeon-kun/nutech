export interface UpdateProfileDTO {
  first_name: string;
  last_name: string;
}

export interface UserResponseDTO {
  email: string;
  first_name: string;
  last_name: string;
  profile_image: string | null;
}
