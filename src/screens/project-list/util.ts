import { useQueryQueryParam } from "utils/url";
import { useMemo } from "react";

export const useProjectsSearchParams = (keys) => {
  const [param, setParam] = useQueryQueryParam(keys);
  return [
    useMemo(() => {
      return { ...param, personId: Number(param.personId) || undefined };
    }, [param]),
    setParam,
  ] as const;
};
