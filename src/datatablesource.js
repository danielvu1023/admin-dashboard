export const movieColumns = [
  { field: "_id", headerName: "ID", width: 70 },
  {
    field: "movie",
    headerName: "Movie",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img} alt="avatar" />
          {params.row.title}
        </div>
      );
    },
  },
  {
    field: "genre",
    headerName: "Genre",
    width: 230,
  },
  {
    field: "year",
    headerName: "Year",
    width: 230,
  },
  {
    field: "limit",
    headerName: "Limit",
    width: 100,
  },
  {
    field: "isSeries",
    headerName: "isSeries",
    width: 160,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.status}`}>
          {params.row.status}
        </div>
      );
    },
  },
];

