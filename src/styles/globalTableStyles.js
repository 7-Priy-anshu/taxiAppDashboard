// src/styles/globalTableStyles.js

const globalTableStyles = {
  table: {
    style: {
      borderRadius: '0.75rem',
      overflow: 'hidden',
    },
  },
  headRow: {
    style: {
      backgroundColor: '#f9fafb',
      fontWeight: '600',
      fontSize: '14px',
      borderBottom: '1px solid #e5e7eb',
    },
  },
  rows: {
    style: {
      minHeight: '60px',
      borderBottom: '1px solid #e5e7eb',
      '&:hover': {
        backgroundColor: '#f9fafb',
      },
    },
  },
  headCells: {
    style: {
      fontSize: '14px',
    },
  },
  cells: {
    style: {
      fontSize: '14px',
    },
  },
};

export default globalTableStyles;

//   const customStyles = {
//     table: {
//       style: {
//         borderRadius: '0.75rem',
//         overflow: 'hidden',
//       },
//     },
//     headRow: {
//       style: {
//         backgroundColor: '#f9fafb', // gray-50
//         fontWeight: '600',
//         fontSize: '14px',
//         borderBottom: '1px solid #e5e7eb', // gray-200
//       },
//     },
//     rows: {
//       style: {
//         minHeight: '60px',
//         borderBottom: '1px solid #e5e7eb',
//         '&:hover': {
//           backgroundColor: '#f9fafb',
//         },
//       },
//     },
//     headCells: {
//       style: {
//         fontSize: '14px',
//       },
//     },
//     cells: {
//       style: {
//         fontSize: '14px',
//       },
//     },
//   };
// export default customStyles;
