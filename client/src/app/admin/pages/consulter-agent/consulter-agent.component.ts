import { Component, OnInit } from '@angular/core';
import { Agent } from 'src/app/types/Agent';
import { AdminService } from '../../admin.service';

@Component({
    selector: 'app-consulter-agent',
    templateUrl: './consulter-agent.component.html',
    styleUrls: ['./consulter-agent.component.css']
})
export class ConsulterAgentComponent implements OnInit {

    agents: Agent[];
    filtredAgents: Agent[];
    selectedAgent: Agent;
    searchedMat: string;
    constructor(private adminService: AdminService) { }

    ngOnInit() {
        this.adminService.getAgents()
            .subscribe((data: any) => {
                this.agents = data.agents
                this.filtredAgents = data.agents
            })
    }
    onDeleteAgent(agentId: string) {
        this.adminService.deleteAgent(agentId)
            .subscribe(() => {
                const agentIndex = this.agents.findIndex((agent) => agent._id === agentId)
                this.agents.splice(agentIndex, 1)
                this.filterAgents()

            })

    }

    setSelectedAgent(agentId) {

        const agentIndex = this.agents.findIndex(agent => agent._id === agentId)
        this.selectedAgent = this.agents[agentIndex]

    }
    filterAgents() {
        this.filtredAgents = this.agents.filter((agent) => agent.matricule.toString().includes(this.searchedMat))
    }

}
