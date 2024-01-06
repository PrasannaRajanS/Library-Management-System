import { Component } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { NodeService } from 'src/app/demo/service/node.service';

@Component({
  selector: 'app-role-page-associate',
  templateUrl: './role-page-associate.component.html',
  styleUrls: ['./role-page-associate.component.scss']
})
export class RolePageAssociateComponent {
  files1: TreeNode[] = [];
  selectedFiles1: TreeNode<any> | TreeNode<any>[] | any[] | any;


  constructor(private nodeService: NodeService) { }

  ngOnInit() {
    this.nodeService.getFiles().then(files => this.files1 = files);
  }

  Save() {

  }

  Clear() {

  }
}
