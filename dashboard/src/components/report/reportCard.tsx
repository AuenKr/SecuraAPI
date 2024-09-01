import {
  CheckIcon,
  ClipboardIcon,
  CodeIcon,
  GaugeIcon,
  LinkIcon,
  ListIcon,
} from "lucide-react";
import { CardContent } from "../ui/card";

export function ReportContent() {
  return (
    <CardContent className="grid gap-6">
      <div className="grid gap-2">
        <div className="flex items-center gap-2">
          <LinkIcon className="h-5 w-5 text-muted-foreground" />
          <h3 className="font-medium">Endpoint</h3>
        </div>
        <p>/api/users</p>
      </div>
      <div className="grid gap-2">
        <div className="flex items-center gap-2">
          <CodeIcon className="h-5 w-5 text-muted-foreground" />
          <h3 className="font-medium">Method</h3>
        </div>
        <p>GET</p>
      </div>
      <div className="grid gap-4">
        <div className="flex items-center gap-2">
          <ListIcon className="h-5 w-5 text-muted-foreground" />
          <h3 className="font-medium">Test Cases</h3>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="flex items-center gap-2">
              <CheckIcon className="h-5 w-5 text-muted-foreground" />
              <h4 className="font-medium">Fetch all users</h4>
            </div>
            <p>Verify that the API returns a list of all users</p>
            <div className="flex items-center gap-2">
              <div className="bg-success px-2 py-1 rounded-md text-success-foreground text-xs font-medium">
                Pass
              </div>
              <div className="bg-success/20 px-2 py-1 rounded-md text-success text-xs font-medium">
                Expected: 200 OK, Actual: 200 OK
              </div>
            </div>
          </div>
          <div className="grid gap-2">
            <div className="flex items-center gap-2">
              <CheckIcon className="h-5 w-5 text-muted-foreground" />
              <h4 className="font-medium">Fetch user by ID</h4>
            </div>
            <p>Verify that the API returns a single user by ID</p>
            <div className="flex items-center gap-2">
              <div className="bg-error px-2 py-1 rounded-md text-error-foreground text-xs font-medium">
                Fail
              </div>
              <div className="bg-error/20 px-2 py-1 rounded-md text-error text-xs font-medium">
                Expected: 200 OK, Actual: 404 Not Found
              </div>
            </div>
          </div>
          <div className="grid gap-2">
            <div className="flex items-center gap-2">
              <CheckIcon className="h-5 w-5 text-muted-foreground" />
              <h4 className="font-medium">Create new user</h4>
            </div>
            <p>Verify that the API creates a new user</p>
            <div className="flex items-center gap-2">
              <div className="bg-success px-2 py-1 rounded-md text-success-foreground text-xs font-medium">
                Pass
              </div>
              <div className="bg-success/20 px-2 py-1 rounded-md text-success text-xs font-medium">
                Expected: 201 Created, Actual: 201 Created
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid gap-2">
        <div className="flex items-center gap-2">
          <GaugeIcon className="h-5 w-5 text-muted-foreground" />
          <h3 className="font-medium">Execution Result</h3>
        </div>
        <div className="flex items-center gap-2">
          <div className="bg-warning px-2 py-1 rounded-md text-warning-foreground text-xs font-medium">
            Inconclusive
          </div>
        </div>
      </div>
      <div className="grid gap-2">
        <div className="flex items-center gap-2">
          <ClipboardIcon className="h-5 w-5 text-muted-foreground" />
          <h3 className="font-medium">Evaluation</h3>
        </div>
        <p>
          The API test report shows that the majority of the test cases passed,
          but there was one failure in fetching a user by ID. This indicates
          that there may be an issue with the user retrieval functionality.
          Additional investigation is needed to determine the root cause of the
          failure and ensure that the API is functioning as expected. Overall,
          the test results are mostly positive, but the team should address the
          identified issue before deploying the API to production.
        </p>
      </div>
    </CardContent>
  );
}
