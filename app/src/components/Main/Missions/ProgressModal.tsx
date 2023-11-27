import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  CheckboxGroup,
  Checkbox,
} from "@nextui-org/react";
import clientORM from "@src/lib/clientORM";
import { useContext, useRef, useState } from "react";
import { useSWRConfig } from "swr";
import { useForm, type SubmitHandler } from "react-hook-form";

import type { Mission } from "@src/types/mission";
import MasterInfoContext from "@src/context/MasterInfoContext";

interface ProgressModalProps {
  onClose: VoidFunction;
  mission: Mission;
}

const ProgressModal = ({ onClose, mission }: ProgressModalProps) => {
  const submitRef = useRef<HTMLButtonElement>(null);
  const [loading, setLoading] = useState(false);
  const { mutate } = useSWRConfig();
  const { handleSubmit, setValue } = useForm<Pick<Mission, "goals">>({
    defaultValues: {
      goals: mission.goals,
    },
  });
  const { player } = useContext(MasterInfoContext);

  const handleProgress: SubmitHandler<Pick<Mission, "goals">> = async (
    data
  ) => {
    if (!player) return;
    setLoading(true);
    const completedGoals = data.goals.filter((el) => el.completed);
    const overallProgress = +(
      (completedGoals.length / data.goals.length) *
      100
    ).toFixed(2);
    const isCompleted = completedGoals.length === data.goals.length ? 1 : 0;

    const sql =
      "UPDATE missions SET goals = ?, overall_progress = ?, is_completed = ? WHERE id = ?";

    if (isCompleted) {
      const sql = "UPDATE players SET money = ?, xp = ? WHERE id = ?";
      try {
        await clientORM(sql, {
          params: [
            player.money + mission.money_reward,
            player.xp + mission.xp_reward,
            player.id,
          ],
        });
      } catch (e) {}
    }

    try {
      await clientORM(sql, {
        params: [
          JSON.stringify(data.goals),
          overallProgress,
          isCompleted,
          mission.id,
        ],
      });
    } catch (e) {}

    mutate("missions");
    mutate("master-info");
    setLoading(false);
    onClose();
  };

  return (
    <Modal isOpen size="3xl" onClose={onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Show Your Progress</ModalHeader>
            <ModalBody>
              <form noValidate onSubmit={handleSubmit(handleProgress)}>
                <CheckboxGroup
                  label="Choose Completed Goals"
                  defaultValue={mission.goals
                    .filter((el) => el.completed)
                    .map((el) => el.uid)}
                  onChange={(v) => {
                    const checkedUids = v as string[];
                    setValue(
                      "goals",
                      mission.goals.map((goal) => {
                        if (checkedUids.includes(goal.uid)) {
                          return {
                            ...goal,
                            completed: true,
                          };
                        }
                        return {
                          ...goal,
                          completed: false,
                        };
                      })
                    );
                  }}
                >
                  {mission.goals.map((goal, i) => (
                    <Checkbox lineThrough value={goal.uid} key={i}>
                      {goal.description}
                    </Checkbox>
                  ))}
                </CheckboxGroup>
                <button type="submit" ref={submitRef} className="hidden" />
              </form>
            </ModalBody>
            <ModalFooter>
              <Button isLoading={loading} variant="light" onPress={onClose}>
                Close
              </Button>
              <Button
                isLoading={loading}
                color="primary"
                onPress={() => submitRef.current?.click()}
              >
                Confirm
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ProgressModal;
