import { Grid } from '@mui/material';
import UserCard from '../UserCard/UserCard';

const ProfileListings = () => {
  return (
    <Grid container rowSpacing={4} sx={{ padding: '0 5vw' }}>
      {dummyData.map((user) => (
        <Grid item display="flex" justifyContent="center" xs={12} sm={6} md={4} key={user.name}>
          <UserCard
            photo={user.photo}
            name={user.name}
            description={user.description}
            rating={user.rating}
            about={user.about}
            location={user.location}
            rate={user.rate}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default ProfileListings;

const dummyData = [
  {
    photo:
      'https://static.remove.bg/remove-bg-web/6cc620ebfb5922c21227f533a09d892abd65defa/assets/start_remove-c851bdf8d3127a24e2d137a55b1b427378cd17385b01aec6e59d5d4b5f39d2ec.png',
    name: 'Norma Byers',
    description: 'Loving pet sitter',
    rating: 4,
    about: 'Dog sitting, cat sitting, pocket pet and bird care',
    location: 'Toronto, Ontario',
    rate: 14,
  },
  {
    photo:
      'https://static.remove.bg/remove-bg-web/6cc620ebfb5922c21227f533a09d892abd65defa/assets/start_remove-c851bdf8d3127a24e2d137a55b1b427378cd17385b01aec6e59d5d4b5f39d2ec.png',
    name: 'Micheal Carnahan',
    description: 'Professional dog trainer',
    rating: 5,
    about: 'I would love to work with your dog',
    location: 'Toronto, Ontario',
    rate: 20,
  },
  {
    photo:
      'https://static.remove.bg/remove-bg-web/6cc620ebfb5922c21227f533a09d892abd65defa/assets/start_remove-c851bdf8d3127a24e2d137a55b1b427378cd17385b01aec6e59d5d4b5f39d2ec.png',
    name: 'Jessica Pearson',
    description: 'Dog care helper',
    rating: 5,
    about: 'I have had dogs as pets for most of my life',
    location: 'Toronto, Ontario',
    rate: 15,
  },
  {
    photo:
      'https://static.remove.bg/remove-bg-web/6cc620ebfb5922c21227f533a09d892abd65defa/assets/start_remove-c851bdf8d3127a24e2d137a55b1b427378cd17385b01aec6e59d5d4b5f39d2ec.png',
    name: 'Charles Compton',
    description: 'Passionate pet sitter',
    rating: 5,
    about: 'I provide dog walking services',
    location: 'Toronto, Ontario',
    rate: 15,
  },
  {
    photo:
      'https://static.remove.bg/remove-bg-web/6cc620ebfb5922c21227f533a09d892abd65defa/assets/start_remove-c851bdf8d3127a24e2d137a55b1b427378cd17385b01aec6e59d5d4b5f39d2ec.png',
    name: 'Charlotte Butler',
    description: 'Animal lover',
    rating: 4,
    about: "I am dog walker that can't wait to meet your pet",
    location: 'Toronto, Ontario',
    rate: 17,
  },
  {
    photo:
      'https://static.remove.bg/remove-bg-web/6cc620ebfb5922c21227f533a09d892abd65defa/assets/start_remove-c851bdf8d3127a24e2d137a55b1b427378cd17385b01aec6e59d5d4b5f39d2ec.png',
    name: 'Joan Blakeney',
    description: 'Loving pet walker',
    rating: 5,
    about: 'I have experience walkig and working with dogs',
    location: 'Toronto, Ontario',
    rate: 13,
  },
];
