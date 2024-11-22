# React Virtualized

## Intro

This application is designed for displaying large lists of users.
Your task is to optimize the rendering process and implement search functionality for this list.
To obtain the list of users, do not delete the line `const users = generateUsers(100000);` however, you may change the number of users or the `generateUsers` if you want.

## Requirements:

1. The application should work and render the component from [page](./src/app/page.js). It should display:

- The text `"User List with Virtualization"` on the page;
- An input element with the placeholder `"Search by name..."`;
- A select element with the id `"perPage"` and the label `"Items per page:"`
- A list of users displaying their names and emails obtained from the [`generateUsers`](./src/app/utils/data.js) function.

2. Use the `List` component from `"react-virtualized"` to render the list of users.
3. Not all of the users should be added to the DOM.
4. When a user types a name into the input, information about the matching user should be displayed and centered in the view.
5. When the user changes the value in the `"Items per page:"` select, `List` components shoud be called with the correct props to display at least the specified number of items.
6. The user table should have a constant `width=600` and `rowHeight=50`. However, the total height of the table should adjust based on the `Items per page` value (`height = row height * number of items`).
7. The `rowCount` of `List` component should be determined by the number of users in the list.

## Tips

Use the [dynamic import with no SSR](https://nextjs.org/docs/pages/building-your-application/optimizing/lazy-loading#with-no-ssr) option for components that use the `List` component.
