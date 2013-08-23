% Convert cell array data to JSON
% Niru Maheswaranathan
% 4:45 AM Aug 20, 2013

%% Load cell data
clc; fprintf('Loading... ');
clear; load('../raw/nature2013.mat');
skeletons = kn_e2006_ALLSKELETONS_FINAL2012;
cellIds   = kn_e2006_ALLSKELETONS_FINAL2012_cellIDs;
matrixPos = kn_e2006_ALLSKELETONS_FINAL2012_cellIDs_sortedByType_MAR2013;
fprintf('Done.\n');

%% Convert each cell's nodes and edges to a JSON object
for matrixId = 1:length(matrixPos);

    % get cell ID based on matrix position
		cellIdx = matrixPos(matrixId);

		% get skeletons associated with this cell ID
		skeletonIds = find(cellIds == cellIdx);

		if isempty(skeletonIds)
				continue;
		else
				skeletonId = skeletonIds(1); % pick one skeleton to use ...
		end

    % nodes
    %for nodeIdx = 1:size(skeletons{skeletonId}.nodes,1)
        %obj.nodes{nodeIdx} = skeletons{skeletonId}.nodes(nodeIdx,1:3);
    %end

    % edges
    for edgeIdx = 1:size(skeletons{skeletonId}.edges,1)
        edgeIndices = skeletons{skeletonId}.edges(edgeIdx,:);
        obj.edges{edgeIdx} = struct('x', skeletons{skeletonId}.nodes(edgeIndices(1),1:3), 'y', skeletons{skeletonId}.nodes(edgeIndices(2),1:3));
    end

    % save to JSON
    savejson('', obj, sprintf('../json/cell%i.json',matrixId));

    % update
    %progressbar(id,length(ids));
		tcprintf('lightGray onRed', 'Cell %i of %i.\n', matrixId, length(matrixPos));

end
