% Convert cell array data to JSON
% Niru Maheswaranathan
% 4:45 AM Aug 20, 2013

%% Load cell data
clc; fprintf('Loading... ');
clear; load('../raw/nature2013.mat');
skeletons = kn_e2006_ALLSKELETONS_FINAL2012;
cellIds   = kn_e2006_ALLSKELETONS_FINAL2012_cellIDs;
matrixPos = kn_e2006_ALLSKELETONS_FINAL2012_cellIDs_sortedByType_MAR2013;
typeId    = kn_e2006_ALLSKELETONS_FINAL2012_globalTypeIDs_REDOMAR2013;
fprintf('Done.\n');

%% store min/max of node values
%nodeRange = [1e9*ones(1,3); -1*ones(1,3)];

%%% store histogram of node locations
%numBins = 100; bins = zeros(3,numBins);
%bins(1,:) = linspace(0,131750,numBins);
%bins(2,:) = linspace(0,119430,numBins);
%bins(3,:) = linspace(0, 80025,numBins);
%hists = zeros(length(matrixPos), numBins, 3);

%% good ranges:
%  x: 3e4 - 13e4 nm (30 - 130 mm)
%  y: 0   - 12e4 nm ( 0 - 120 mm)
%  z: 0   -  8e4 nm ( 0 -  80 mm)

%% get cell type correspondences (using supp info 1 & 4)
load('../raw/cellTypes.mat');

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

    %% HISTOGRAMS
    % get rough idea of the range of (connected) node values
    skel = skeletons{skeletonId};
    %nodes = skel.nodes(skel.edges(:),1:3);

    %% check for min/max
    %minVal = min(nodes); minIdx = min(nodes) < nodeRange(1,:); % min values & indices if novel
    %maxVal = max(nodes); maxIdx = max(nodes) > nodeRange(2,:); % max values & indices if novel
    %nodeRange(1,minIdx) = minVal(minIdx);
    %nodeRange(2,maxIdx) = maxVal(maxIdx);

    %% get histograms
    %for j = 1:3
        %hists(matrixId,:,j) = hist(nodes(:,j),bins(j,:));
    %end

    %% get cell type
    cellTypeIdx = find(cellTypeCorrespondence == typeId(skeletonId));
    if cellTypeIdx <= 12
        cellType = 'ganglion';
    elseif (cellTypeIdx > 12) && (cellTypeIdx <= 24)
        cellType = 'narrow-field amacrine';
    elseif (cellTypeIdx > 24) && (cellTypeIdx <= 57)
        cellType = 'medium/wide-field amacrine';
    elseif (cellTypeIdx > 58) && (cellTypeIdx <= 71)
        cellType = 'bipolar';
    else
        cellType = 'unknown';
    end
    obj.typeIdx = cellTypeIdx;
    obj.type = cellType;

    % edges
    for edgeIdx = 1:size(skel.edges,1)
        edgeIndices = skeletons{skeletonId}.edges(edgeIdx,:);
        obj.edges{edgeIdx} = struct('p1', skel.nodes(edgeIndices(1),1:3)/1e3, 'p2', skel.nodes(edgeIndices(2),1:3)/1e3);
    end

    % save to JSON
    savejson('', obj, sprintf('../json/cell%i.json',matrixId));

    % update
    %progressbar(id,length(ids));
	tcprintf('lightGray onRed', 'Cell %i of %i.\n', matrixId, length(matrixPos));

end
