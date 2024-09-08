import assert from "assert";
import { 
  TestHelpers,
  GitmoVault_Claimed
} from "generated";
const { MockDb, GitmoVault } = TestHelpers;

describe("GitmoVault contract Claimed event tests", () => {
  // Create mock db
  const mockDb = MockDb.createMockDb();

  // Creating mock for GitmoVault contract Claimed event
  const event = GitmoVault.Claimed.createMockEvent({/* It mocks event fields with default values. You can overwrite them if you need */});

  it("GitmoVault_Claimed is created correctly", async () => {
    // Processing the event
    const mockDbUpdated = await GitmoVault.Claimed.processEvent({
      event,
      mockDb,
    });

    // Getting the actual entity from the mock database
    let actualGitmoVaultClaimed = mockDbUpdated.entities.GitmoVault_Claimed.get(
      `${event.chainId}_${event.block.number}_${event.logIndex}`
    );

    // Creating the expected entity
    const expectedGitmoVaultClaimed: GitmoVault_Claimed = {
      id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
      username: event.params.username,
      value: event.params.value,
    };
    // Asserting that the entity in the mock database is the same as the expected entity
    assert.deepEqual(actualGitmoVaultClaimed, expectedGitmoVaultClaimed, "Actual GitmoVaultClaimed should be the same as the expectedGitmoVaultClaimed");
  });
});
