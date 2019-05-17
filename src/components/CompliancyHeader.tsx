import * as React from "react";
import {
    CustomHeader,
    HeaderIcon,
    TitleSize,
    HeaderTitleArea,
    HeaderTitleRow,
    HeaderTitle,
    HeaderDescription
} from "azure-devops-ui/Header";
import { Status, Statuses, StatusSize } from "azure-devops-ui/Status";
import { Ago } from "azure-devops-ui/Ago";
import { AgoFormat } from "azure-devops-ui/Utilities/Date";
import { HeaderCommandBar } from "azure-devops-ui/HeaderCommandBar";
import { ICompliancyCheckerService } from "../services/ICompliancyCheckerService";

interface ICompliancyHeaderProps {
    headerText: string;
    lastScanDate: Date;
    rescanUrl: string;
    onRescanFinished?: () => Promise<void>;
    compliancyCheckerService: ICompliancyCheckerService;
}

interface IState {
    isRescanning: boolean;
}

export default class extends React.Component<ICompliancyHeaderProps, IState> {
    constructor(props: ICompliancyHeaderProps) {
        super(props);
        this.state = {
            isRescanning: false
        };
    }

    private async doRescanRequest(): Promise<void> {
        this.setState({ isRescanning: true });
        await this.props.compliancyCheckerService.DoRescanRequest(
            this.props.rescanUrl,
            () => {
                this.setState({ isRescanning: false });
            },
            () => {
                this.setState({ isRescanning: false });
            }
        );
        if (this.props.onRescanFinished) await this.props.onRescanFinished();
    }

    render() {
        return (
            <CustomHeader className="bolt-header-with-commandbar">
                <HeaderIcon
                    className="bolt-table-status-icon-large"
                    iconProps={{ iconName: "OpenSource" }}
                    // @ts-ignore
                    titleSize={TitleSize.Large}
                />
                <HeaderTitleArea>
                    <HeaderTitleRow>
                        <HeaderTitle
                            className="text-ellipsis"
                            // @ts-ignore
                            titleSize={TitleSize.Large}
                        >
                            {this.props.headerText}
                        </HeaderTitle>
                    </HeaderTitleRow>
                    <HeaderDescription>
                        <div className="flex-row">
                            {this.state.isRescanning ? (
                                <div>
                                    <Status
                                        {...Statuses.Running}
                                        key="scanning"
                                        // @ts-ignore
                                        size={StatusSize.l}
                                        text="Scanning..."
                                    />
                                </div>
                            ) : (
                                <div>
                                    Last scanned:{" "}
                                    <Ago
                                        date={this.props.lastScanDate}
                                        // @ts-ignore
                                        format={AgoFormat.Extended}
                                    />
                                </div>
                            )}
                            <div className="flex-grow" />
                        </div>
                    </HeaderDescription>
                </HeaderTitleArea>
                <HeaderCommandBar
                    items={[
                        {
                            iconProps: { iconName: "TriggerAuto" },
                            id: "rescan",
                            important: true,
                            disabled: this.state.isRescanning,
                            isPrimary: true,
                            onActivate: () => {
                                this.doRescanRequest();
                            },
                            text: "Rescan"
                        }
                    ]}
                />
            </CustomHeader>
        );
    }
}
