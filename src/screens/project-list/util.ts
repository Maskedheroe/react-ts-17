import { useUrlQueryParam } from "utils/url";
import { useMemo } from "react";

export const useProjectsSearchParams = (keys) => {
  const [param, setParam] = useUrlQueryParam(keys);
  return [
    useMemo(() => {
      return { ...param, personId: Number(param.personId) || undefined };
    }, [param]),
    setParam,
  ] as const;
};

export const useProjectModal = () => {
  const [{ projectCreate }, setProjectCreate] = useUrlQueryParam(['projectCreate'])

  const open = () => setProjectCreate({projectCreate: true})
  const close = () => setProjectCreate({projectCreate: undefined})

  return {
    open,
    close,
    projectModalOpen: projectCreate === 'true',
  }
}
