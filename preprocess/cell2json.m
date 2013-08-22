% Convert cell array data to JSON
% Niru Maheswaranathan
% 4:45 AM Aug 20, 2013

%% Load cell data
clc; fprintf('Loading... ');
clear; load('../raw/nature2013.mat');
cells = kn_e2006_ALLSKELETONS_FINAL2012;
ids = kn_e2006_ALLSKELETONS_FINAL2012_cellIDs_sortedByType_MAR2013;
fprintf('Done.\n');

%% Convert each cell's nodes and edges to a JSON object
for id = 101:length(ids)

    % id
    cellIdx = ids(id);
    obj.id = cellIdx;

    % nodes
    for nodeIdx = 1:size(cells{cellIdx}.nodes,1)
        obj.nodes{nodeIdx} = cells{cellIdx}.nodes(nodeIdx,1:3);
    end

    % edges
    for edgeIdx = 1:size(cells{cellIdx}.edges,1)
        obj.edges{edgeIdx} = cells{cellIdx}.edges(edgeIdx,:);
    end

    % save to JSON
    savejson('', obj, sprintf('../json/cell%i.json',id));

    % update
    progressbar(cellIdx,length(ids));

end