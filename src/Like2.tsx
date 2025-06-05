import { Button } from "antd";

export const Like2 = (props: any) => {
  const [liked, setLiked] = window.React.useState(false);

  return liked ? (
    "Liked!"
  ) : (
    <Button onClick={() => setLiked(true)}> Like </Button>
  );
};
