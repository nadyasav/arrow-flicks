import { useRouter } from "next/router";

export default function Movie() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      Movie {id}
    </div>
  );
}
