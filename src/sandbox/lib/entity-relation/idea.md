{
    data: {
        parent_doc: "guid"
        case_object: "guid"
    }
}

parent_doc -> state
case_object -> stage => state

const { guidType, n, countStage } = await eRel.get(guid, {
        parentDoc: "data.{ parent_doc:doc }.data.state[]",
        parentDoc: "data.{ parent_doc:PoI }.data.state[]",
        parentDoc: "data.{ stages:stage }.data.state[]",
        parentDoc: "data.{ parent_doc }.data.state[]",
        parentDoc: "data.{ parent_doc }.data.state[]",
        parentDoc: "data.{ parent_doc }.data.state[]",
        parentDoc: "data.{ parent_doc }.data.state[]",
        parentDoc: "data.{ parent_doc }.data.state[]",
        listStage: () => {

    }
}, "POI");


doc: (rootDoc, path) {
   reuturn docIface getOne (_.get(rootDoc, path));
}
PoI: (root, path) {
    reuturn docIface getOne (_.get(rootDoc, path), {type: 'POI'});
}

POIStage: (rootDoc) {
    reuturn beIface getOne (_.get(rootDoc, 'case_object'), {type: 'stage'});
}

'data.approvers[1]'
'data.approvers[]'
'data.approvers[*]'

'data.approvers[](key = value)'
'data.approvers[](key in [1, 2, ...])'
'data.approvers[](key ~ RegExp)'

const state = await eRel
    .extract("document", guid)
    .transform("data.{ inspection: be }.data.state")
    .get(ctx)

const state = await eRel
    .entity(ctx, "document", guid)
    .extract("data.{ inspection: be }.data.state")

const state = await eRel -> API
    .entity(ctx, "document", guid)
    .extract({

    })

const state = await eRel(ctx) -> init API

    .entity("document", guid) -> Promise
    .extract({

    }) -> Promise



const state = await eRel.get(ctx, "case-administrative-offence-documents", guid, {

})


type + guid
{
    name1: 'data.{parent:typeName}'
    name2 'data.{case:be}.data.suslik'
}


Init {
    resolver(dataForResolve) {
        {
            value: GUID,
            type: document
        }

    }
}
