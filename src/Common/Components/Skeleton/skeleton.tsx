import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

type SkeletonProps = {
  type?: "stat" | "scrap";
};

function ScrapCardSkeleton({ type = "stat" }: SkeletonProps) {
  if (type === "scrap") {
    return (
      <Box
        className="scrap-card"
        sx={{ p: 2, borderRadius: 2, width: "95%",  backgroundColor: "#f5f5f5",}}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", gap: 1 }}>
            <Skeleton variant="rectangular" width={40} height={40} />
            <Box>
              <Skeleton variant="text" width={180} />
              <Skeleton variant="text" width={120} />
              
            </Box>
          </Box>

          <Skeleton variant="rounded" width={80} height={26} />
        </Box>

        <Skeleton
          variant="rounded"
          width="100%"
          height={36}
          sx={{ mt: 2 }}
        />
      </Box>
    );
  }

  return (
    <Box
      className="stat-card"
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 16px",
        borderRadius: 1,
        height: 57.57,
        width: "100%",
        maxWidth: 344.57,
        backgroundColor: "#f5f5f5",
      }}
    >
      <Skeleton variant="text" width="60%" height={20} />
      <Skeleton variant="text" width="20%" height={20} />
    </Box>
  );
}

export default ScrapCardSkeleton;