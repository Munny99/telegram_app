import { Component, OnInit } from '@angular/core';

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  bio: string;
  avatar: string;
  location: string;
  website: string;
  joinDate: Date;
}


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
 profile: UserProfile = {
    name: ' Munny',
    email: 'munny99@gmail.com',
    phone: '+8801777777777',
    bio: 'Full-stack developer passionate about creating elegant solutions to complex problems. Love working with Angular and modern web technologies.',
    avatar: 'https://ui-avatars.com/api/?name=John+Doe&size=200&background=4f46e5&color=fff',
    location: 'Dhaka, Bangladesh',
    website: 'https://johndoe.dev',
    joinDate: new Date('2023-01-15')
  };

  isEditing = false;
  editedProfile: UserProfile = { ...this.profile };

  stats = [
    { label: 'Projects', value: 24 },
    { label: 'Followers', value: 1.2 },
    { label: 'Following', value: 328 }
  ];

  ngOnInit(): void {
   
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
    if (this.isEditing) {
      this.editedProfile = { ...this.profile };
    }
  }

  saveProfile(): void {
    this.profile = { ...this.editedProfile };
    this.isEditing = false;
    console.log('Profile saved:', this.profile);
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.editedProfile = { ...this.profile };
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.editedProfile.avatar = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
}
